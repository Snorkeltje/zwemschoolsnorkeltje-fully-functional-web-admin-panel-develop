import { supabase } from '../supabase';

// ═══════════════════════════════════════════════════════════════════════════
//   CUSTOMERS (parent profiles + their children)
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminCustomer {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  city: string;
  childCount: number;
  status: 'Actief' | 'Nieuw' | 'Inactief';
  createdAt: string;
  walletBalanceCents: number;
}

export async function fetchCustomers(): Promise<AdminCustomer[]> {
  const { data: parents } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, phone, city, created_at')
    .eq('role', 'parent')
    .order('created_at', { ascending: false });
  if (!parents?.length) return [];

  const parentIds = parents.map(p => p.id as string);

  // Children counts per parent
  const { data: children } = await supabase
    .from('children')
    .select('parent_id')
    .in('parent_id', parentIds);
  const childCountMap: Record<string, number> = {};
  for (const c of children ?? []) {
    const id = c.parent_id as string;
    childCountMap[id] = (childCountMap[id] ?? 0) + 1;
  }

  // Wallet balances per parent
  const { data: vouchers } = await supabase
    .from('credit_vouchers')
    .select('parent_id, current_balance_cents')
    .in('parent_id', parentIds);
  const walletMap: Record<string, number> = {};
  for (const v of vouchers ?? []) {
    const id = v.parent_id as string;
    walletMap[id] = (walletMap[id] ?? 0) + ((v.current_balance_cents as number) ?? 0);
  }

  // Active = has any reservations in last 90 days
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const { data: recentRes } = await supabase
    .from('reservations')
    .select('parent_id')
    .in('parent_id', parentIds)
    .gte('created_at', ninetyDaysAgo.toISOString());
  const activeSet = new Set((recentRes ?? []).map(r => r.parent_id as string));

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return parents.map(p => {
    const created = new Date(p.created_at as string);
    const isNew = created > sevenDaysAgo;
    const isActive = activeSet.has(p.id as string);
    const status: AdminCustomer['status'] = isNew ? 'Nieuw' : isActive ? 'Actief' : 'Inactief';
    return {
      id: p.id as string,
      parentName: `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() || (p.email as string),
      email: (p.email as string) ?? '',
      phone: (p.phone as string) ?? '',
      city: (p.city as string) ?? '',
      childCount: childCountMap[p.id as string] ?? 0,
      status,
      createdAt: p.created_at as string,
      walletBalanceCents: walletMap[p.id as string] ?? 0,
    };
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//   CUSTOMER DETAIL — full data for one parent
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminCustomerChild {
  id: string;
  name: string;
  dateOfBirth: string | null;
  age: number | null;
  progressPercent: number;
}

export interface AdminCustomerReservation {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  instructorName: string;
  status: string;
  paymentStatus: string;
  amountCents: number;
  childName: string;
}

export interface AdminCustomerVoucherTx {
  id: string;
  type: string;
  amountCents: number;
  description: string;
  createdAt: string;
}

export interface AdminCustomerDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string | null;
  status: 'Actief' | 'Nieuw' | 'Inactief';
  createdAt: string;
  lastLoginAt: string | null;
  children: AdminCustomerChild[];
  reservations: AdminCustomerReservation[];
  walletBalanceCents: number;
  walletTransactions: AdminCustomerVoucherTx[];
  totalSpendCents: number;
}

export async function fetchCustomerDetail(parentId: string): Promise<AdminCustomerDetail | null> {
  const { data: profile, error: pe } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, phone, city, created_at')
    .eq('id', parentId)
    .maybeSingle();
  if (pe) {
    console.warn('fetchCustomerDetail profile error:', pe);
    return null;
  }
  if (!profile) return null;

  // Children
  const { data: kids } = await supabase
    .from('children')
    .select('id, name, date_of_birth, first_name, last_name')
    .eq('parent_id', parentId);

  // Per-child progress percentages from child_skill_step_progress + skill_steps
  const childIds = (kids ?? []).map((k: Record<string, unknown>) => k.id as string);
  const progressMap: Record<string, { sum: number; total: number }> = {};
  if (childIds.length) {
    const { data: phases } = await supabase
      .from('child_skill_step_progress')
      .select('child_id, phase')
      .in('child_id', childIds);
    for (const p of phases ?? []) {
      const id = p.child_id as string;
      progressMap[id] = progressMap[id] || { sum: 0, total: 0 };
      progressMap[id].sum += ((p.phase as number) ?? 1) - 1;
      progressMap[id].total += 1;
    }
    // Pad out total by counting all curriculum items the child SHOULD have.
    const { data: allItems } = await supabase
      .from('skill_steps')
      .select('id', { count: 'exact', head: false });
    const totalItems = allItems?.length ?? 0;
    for (const cid of childIds) {
      progressMap[cid] = progressMap[cid] || { sum: 0, total: 0 };
      progressMap[cid].total = Math.max(progressMap[cid].total, totalItems);
    }
  }

  const today = new Date();
  const ageOf = (dob: string | null): number | null => {
    if (!dob) return null;
    const d = new Date(dob);
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  };

  const children: AdminCustomerChild[] = (kids ?? []).map((k: Record<string, unknown>) => {
    const fullName =
      ((k.first_name as string) || '') + (k.last_name ? ' ' + (k.last_name as string) : '');
    const display = (k.name as string) || fullName.trim() || 'Onbekend';
    const id = k.id as string;
    const prog = progressMap[id];
    const pct = prog && prog.total > 0 ? Math.round((prog.sum / (prog.total * 3)) * 100) : 0;
    return {
      id,
      name: display,
      dateOfBirth: (k.date_of_birth as string) || null,
      age: ageOf((k.date_of_birth as string) || null),
      progressPercent: pct,
    };
  });

  // Reservations (last 12 months)
  const since = new Date();
  since.setMonth(since.getMonth() - 12);
  const { data: reservations } = await supabase
    .from('reservations')
    .select(`
      id, status, payment_status, amount_cents, created_at,
      children:child_id ( name, first_name, last_name ),
      lessons:lesson_id (
        date, start_time, end_time, type,
        locations:location_id ( name ),
        instructor:instructor_id ( first_name, last_name )
      )
    `)
    .eq('parent_id', parentId)
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: false });

  const resMapped: AdminCustomerReservation[] = (reservations ?? []).map((r: Record<string, unknown>) => {
    const c = r.children as { name?: string; first_name?: string; last_name?: string } | null;
    const l = r.lessons as {
      date?: string; start_time?: string; end_time?: string; type?: string;
      locations?: { name?: string } | null;
      instructor?: { first_name?: string; last_name?: string } | null;
    } | null;
    const childName =
      c?.name || `${c?.first_name ?? ''} ${c?.last_name ?? ''}`.trim() || '—';
    return {
      id: r.id as string,
      date: l?.date ?? '',
      startTime: (l?.start_time ?? '').slice(0, 5),
      endTime: (l?.end_time ?? '').slice(0, 5),
      type: l?.type ?? '1-op-1',
      location: l?.locations?.name ?? '—',
      instructorName: `${l?.instructor?.first_name ?? ''} ${l?.instructor?.last_name ?? ''}`.trim() || '—',
      status: (r.status as string) ?? 'confirmed',
      paymentStatus: (r.payment_status as string) ?? 'pending',
      amountCents: (r.amount_cents as number) ?? 0,
      childName,
    };
  });

  // Wallet — sum credit_vouchers + recent transactions
  const { data: vouchers } = await supabase
    .from('credit_vouchers')
    .select('id, current_balance_cents')
    .eq('parent_id', parentId);
  const walletBalanceCents = (vouchers ?? []).reduce(
    (s: number, v: Record<string, unknown>) => s + ((v.current_balance_cents as number) ?? 0),
    0,
  );
  const voucherIds = (vouchers ?? []).map((v: Record<string, unknown>) => v.id as string);

  let walletTransactions: AdminCustomerVoucherTx[] = [];
  if (voucherIds.length) {
    const { data: txs } = await supabase
      .from('voucher_transactions')
      .select('id, type, amount_cents, description, created_at')
      .in('voucher_id', voucherIds)
      .order('created_at', { ascending: false })
      .limit(20);
    walletTransactions = (txs ?? []).map((t: Record<string, unknown>) => ({
      id: t.id as string,
      type: (t.type as string) ?? '—',
      amountCents: (t.amount_cents as number) ?? 0,
      description: (t.description as string) ?? '',
      createdAt: t.created_at as string,
    }));
  }

  // Total spend = sum of paid reservations
  const totalSpendCents = resMapped
    .filter(r => r.paymentStatus === 'paid')
    .reduce((s, r) => s + r.amountCents, 0);

  // Status calc
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const created = new Date(profile.created_at as string);
  const recent = resMapped.some(r => new Date(r.date) > ninetyDaysAgo);
  const status: AdminCustomerDetail['status'] =
    created > sevenDaysAgo ? 'Nieuw' : recent ? 'Actief' : 'Inactief';

  return {
    id: profile.id as string,
    firstName: (profile.first_name as string) ?? '',
    lastName: (profile.last_name as string) ?? '',
    email: (profile.email as string) ?? '',
    phone: (profile.phone as string) ?? '',
    city: (profile.city as string) ?? '',
    address: null,
    status,
    createdAt: profile.created_at as string,
    lastLoginAt: null,
    children,
    reservations: resMapped,
    walletBalanceCents,
    walletTransactions,
    totalSpendCents,
  };
}

export async function updateCustomerProfile(
  id: string,
  fields: { first_name?: string; last_name?: string; phone?: string; city?: string; address?: string },
): Promise<{ ok: boolean; error?: string }> {
  // `address` column doesn't exist on profiles yet — strip it before write.
  const { address: _address, ...safeFields } = fields;
  const { error } = await supabase.from('profiles').update(safeFields).eq('id', id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export interface CreateCustomerInput {
  parent: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
    city?: string;
    address?: string;
  };
  child: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    level?: string;
  };
  lesson_preference?: {
    location: string;
    type: string;
    day: string;
    time: string;
  };
}

export async function createCustomerViaEdgeFn(
  input: CreateCustomerInput,
): Promise<{ ok: boolean; userId?: string; childId?: string; error?: string }> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return { ok: false, error: 'Niet ingelogd' };
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-create-customer`;
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) return { ok: false, error: body.error || `HTTP ${r.status}` };
  return { ok: true, userId: body.userId, childId: body.childId };
}

export async function deleteCustomer(parentId: string): Promise<{ ok: boolean; error?: string }> {
  // Cascade order: progress → reservations → children → vouchers → notifications → profile.
  // auth.users row is not removed here (admin can do that separately if needed).
  try {
    const { data: kids } = await supabase.from('children').select('id').eq('parent_id', parentId);
    const kidIds = (kids ?? []).map((k: { id: string }) => k.id);
    if (kidIds.length) {
      await supabase.from('child_skill_step_progress').delete().in('child_id', kidIds);
    }
    await supabase.from('reservations').delete().eq('parent_id', parentId);
    if (kidIds.length) await supabase.from('children').delete().in('id', kidIds);
    await supabase.from('credit_vouchers').delete().eq('parent_id', parentId);
    await supabase.from('notifications').delete().eq('user_id', parentId);
    await supabase.from('waitlist').delete().eq('parent_id', parentId);
    const { error: pe } = await supabase.from('profiles').delete().eq('id', parentId);
    if (pe) return { ok: false, error: pe.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//   RESERVATION CREATION — best-effort save from admin's multi-step wizard
// ═══════════════════════════════════════════════════════════════════════════

export interface CreateReservationInput {
  parentId: string;
  childId: string;
  date: string;          // YYYY-MM-DD
  startTime: string;     // HH:mm
  endTime: string;       // HH:mm
  type: '1-op-1' | '1-op-2' | '1-op-3' | 'Survival';
  locationName?: string; // optional — uses any location with this name, else first
  amountCents: number;
  paymentMethod: 'wallet' | 'ideal' | 'manual' | 'invoice';
  notes?: string;
}

/// Best-effort: find or create a `lessons` row, then insert a `reservations` row.
/// Picks first matching location + first available instructor when needed.
export async function createReservationFromForm(
  input: CreateReservationInput,
): Promise<{ ok: boolean; reservationId?: string; error?: string }> {
  try {
    // 1. Resolve location
    const locQ = supabase.from('locations').select('id, name').eq('active', true);
    const { data: locs } = input.locationName
      ? await locQ.eq('name', input.locationName).limit(1)
      : await locQ.limit(1);
    if (!locs?.length) return { ok: false, error: 'Geen actieve locatie gevonden' };
    const locationId = locs[0].id as string;

    // 2. First instructor (best-effort) — profiles has no `active` column.
    const { data: instr } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'instructor')
      .limit(1);
    if (!instr?.length) return { ok: false, error: 'Geen actieve instructeur gevonden' };
    const instructorId = instr[0].id as string;

    // 3. Find or create matching lesson
    const { data: existing } = await supabase
      .from('lessons')
      .select('id')
      .eq('date', input.date)
      .eq('start_time', input.startTime + ':00')
      .eq('location_id', locationId)
      .limit(1);
    let lessonId: string;
    if (existing && existing.length > 0) {
      lessonId = existing[0].id as string;
    } else {
      const { data: created, error: lessonErr } = await supabase.from('lessons').insert({
        instructor_id: instructorId,
        location_id: locationId,
        date: input.date,
        start_time: input.startTime + ':00',
        end_time: input.endTime + ':00',
        type: input.type,
        max_students: input.type === '1-op-1' ? 1 : input.type === '1-op-2' ? 2 : 3,
        price_cents: input.amountCents,
      }).select('id').single();
      if (lessonErr || !created) {
        return { ok: false, error: lessonErr?.message ?? 'Lesson aanmaken mislukt' };
      }
      lessonId = created.id as string;
    }

    // 4. Insert reservation — `notes` column doesn't exist on reservations yet.
    const { data: r, error: resErr } = await supabase.from('reservations').insert({
      lesson_id: lessonId,
      parent_id: input.parentId,
      child_id: input.childId,
      status: 'confirmed',
      payment_method: input.paymentMethod,
      payment_status: input.paymentMethod === 'invoice' ? 'pending' : 'paid',
      amount_cents: input.amountCents,
    }).select('id').single();
    if (resErr || !r) return { ok: false, error: resErr?.message ?? 'Reservering insert mislukt' };

    return { ok: true, reservationId: r.id as string };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//   CONVERSATIONS & MESSAGES — admin chat view
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'parent' | 'instructor';
  subject: string | null;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export async function fetchAdminConversations(): Promise<AdminConversation[]> {
  const { data: { user } } = await supabase.auth.getUser();
  const { data: convs } = await supabase
    .from('conversations')
    .select(`
      id, parent_id, instructor_id, subject, last_message, last_message_at,
      parent:parent_id ( first_name, last_name ),
      instructor:instructor_id ( first_name, last_name )
    `)
    .order('last_message_at', { ascending: false, nullsFirst: false });

  // Per-conversation unread count (messages where current user not in read_by + sender !== current user)
  const convIds = (convs ?? []).map((c: Record<string, unknown>) => c.id as string);
  const unreadMap: Record<string, number> = {};
  if (convIds.length && user?.id) {
    const { data: msgs } = await supabase
      .from('messages')
      .select('conversation_id, sender_id, read_by')
      .in('conversation_id', convIds);
    for (const m of msgs ?? []) {
      if (m.sender_id === user.id) continue;
      const readBy = (m.read_by as string[] | null) ?? [];
      if (readBy.includes(user.id)) continue;
      const cid = m.conversation_id as string;
      unreadMap[cid] = (unreadMap[cid] ?? 0) + 1;
    }
  }

  return (convs ?? []).map((c: Record<string, unknown>) => {
    // Determine "other participant" — admin is viewing, so show parent or instructor
    const parent = c.parent as { first_name?: string; last_name?: string } | null;
    const instructor = c.instructor as { first_name?: string; last_name?: string } | null;
    // Prefer the parent (most chats are parent-driven); fall back to instructor.
    const isParent = !!parent;
    const p = isParent ? parent : instructor;
    return {
      id: c.id as string,
      participantId: (isParent ? c.parent_id : c.instructor_id) as string,
      participantName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      participantRole: isParent ? 'parent' : 'instructor',
      subject: (c.subject as string) || null,
      lastMessage: (c.last_message as string) || null,
      lastMessageAt: (c.last_message_at as string) || null,
      unreadCount: unreadMap[c.id as string] ?? 0,
    };
  });
}

export interface AdminMessage {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
  isAdmin: boolean;
}

export async function fetchConversationMessages(conversationId: string): Promise<AdminMessage[]> {
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('messages')
    .select('id, sender_id, body, created_at, read_by')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  // Mark unread messages as read by the admin user.
  if (user?.id && data?.length) {
    const unread = data.filter(m => {
      const rb = (m.read_by as string[] | null) ?? [];
      return m.sender_id !== user.id && !rb.includes(user.id);
    });
    if (unread.length) {
      await Promise.all(unread.map(m => {
        const rb = (m.read_by as string[] | null) ?? [];
        return supabase.from('messages').update({ read_by: [...rb, user.id] }).eq('id', m.id);
      }));
    }
  }

  return (data ?? []).map(m => ({
    id: m.id as string,
    senderId: m.sender_id as string,
    body: (m.body as string) ?? '',
    createdAt: m.created_at as string,
    isAdmin: m.sender_id === user?.id,
  }));
}

export async function sendAdminMessage(conversationId: string, body: string): Promise<{ ok: boolean; error?: string }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) return { ok: false, error: 'Niet ingelogd' };
  const { error } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body,
    read_by: [user.id],
  });
  if (error) return { ok: false, error: error.message };
  // Update conversation last_message + last_message_at
  await supabase.from('conversations').update({
    last_message: body.slice(0, 200),
    last_message_at: new Date().toISOString(),
  }).eq('id', conversationId);
  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════════════════
//   INVOICES & PAYMENTS — derived from reservations + registration_payments
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminInvoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  amountCents: number;
  outstandingCents: number;
  status: 'Betaald' | 'Open' | 'Geannuleerd';
  description: string;
  source: 'reservation' | 'registration';
}

export async function fetchAllInvoices(): Promise<AdminInvoice[]> {
  // 1. Reservations
  const { data: reservations } = await supabase
    .from('reservations')
    .select(`
      id, status, payment_status, amount_cents, created_at, parent_id,
      profiles:parent_id ( first_name, last_name ),
      lessons:lesson_id ( date, type, locations:location_id ( name ) )
    `)
    .gt('amount_cents', 0)
    .order('created_at', { ascending: false })
    .limit(500);

  const invoiceLines: AdminInvoice[] = (reservations ?? []).map((r: Record<string, unknown>) => {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const l = r.lessons as { date?: string; type?: string; locations?: { name?: string } } | null;
    const status: AdminInvoice['status'] =
      r.status === 'cancelled' ? 'Geannuleerd'
      : r.payment_status === 'paid' ? 'Betaald' : 'Open';
    const num = `RES-${(r.id as string).slice(0, 8).toUpperCase()}`;
    return {
      id: r.id as string,
      number: num,
      customerId: (r.parent_id as string) ?? '',
      customerName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      date: (l?.date as string) || (r.created_at as string).slice(0, 10),
      amountCents: (r.amount_cents as number) ?? 0,
      outstandingCents: r.payment_status === 'paid' ? 0 : (r.amount_cents as number) ?? 0,
      status,
      description: `${l?.type ?? '1-op-1'} les · ${l?.locations?.name ?? '—'}`,
      source: 'reservation',
    };
  });

  // 2. Registration fees
  const { data: regs } = await supabase
    .from('registration_payments')
    .select(`
      id, parent_id, amount_cents, status, created_at,
      profiles:parent_id ( first_name, last_name )
    `)
    .order('created_at', { ascending: false })
    .limit(200);

  const regLines: AdminInvoice[] = (regs ?? []).map((r: Record<string, unknown>) => {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const status: AdminInvoice['status'] = r.status === 'paid' ? 'Betaald'
      : r.status === 'cancelled' ? 'Geannuleerd' : 'Open';
    return {
      id: r.id as string,
      number: `REG-${(r.id as string).slice(0, 8).toUpperCase()}`,
      customerId: (r.parent_id as string) ?? '',
      customerName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      date: (r.created_at as string).slice(0, 10),
      amountCents: (r.amount_cents as number) ?? 0,
      outstandingCents: r.status === 'paid' ? 0 : (r.amount_cents as number) ?? 0,
      status,
      description: 'Inschrijfgeld',
      source: 'registration',
    };
  });

  return [...invoiceLines, ...regLines].sort((a, b) => b.date.localeCompare(a.date));
}

export interface AdminPayment {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  amountCents: number;
  method: 'iDEAL' | 'Tegoed' | 'Handmatig' | 'Stripe' | '—';
  status: 'Voltooid' | 'In behandeling' | 'Mislukt' | 'Terugbetaald';
  reference: string;
  description: string;
}

export async function fetchAllPayments(): Promise<AdminPayment[]> {
  const { data } = await supabase
    .from('reservations')
    .select(`
      id, payment_status, payment_method, amount_cents, created_at, stripe_payment_intent_id, parent_id,
      profiles:parent_id ( first_name, last_name ),
      lessons:lesson_id ( type )
    `)
    .neq('payment_status', null)
    .order('created_at', { ascending: false })
    .limit(500);

  return (data ?? []).map((r: Record<string, unknown>) => {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const l = r.lessons as { type?: string } | null;
    const ps = r.payment_status as string;
    const status: AdminPayment['status'] =
      ps === 'paid' ? 'Voltooid'
      : ps === 'failed' ? 'Mislukt'
      : ps === 'refunded' ? 'Terugbetaald'
      : 'In behandeling';
    const pm = r.payment_method as string;
    const method: AdminPayment['method'] =
      pm === 'ideal' ? 'iDEAL'
      : pm === 'wallet' || pm === 'tegoed' ? 'Tegoed'
      : pm === 'manual' || pm === 'handmatig' ? 'Handmatig'
      : pm === 'stripe' ? 'Stripe'
      : '—';
    return {
      id: r.id as string,
      date: (r.created_at as string).slice(0, 10),
      customerId: (r.parent_id as string) ?? '',
      customerName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      amountCents: (r.amount_cents as number) ?? 0,
      method,
      status,
      reference: ((r.stripe_payment_intent_id as string) || (r.id as string)).slice(0, 16),
      description: `${l?.type ?? 'Les'} reservering`,
    };
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//   EXAMS — children at or near exam-readiness for Diploma A/B/C
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminExamCandidate {
  childId: string;
  childName: string;
  parentId: string;
  parentName: string;
  diplomaLevel: 'A' | 'B' | 'C';
  totalItems: number;
  itemsMastered: number;
  percent: number;
  readyForExam: boolean;
}

export async function fetchExamCandidates(): Promise<AdminExamCandidate[]> {
  // 1. Diploma skills + their step IDs
  const { data: diplomaSkills } = await supabase
    .from('skills')
    .select('id, level')
    .like('level', 'Diploma %');
  if (!diplomaSkills?.length) return [];

  const diplomaIds = diplomaSkills.map(d => d.id as string);
  const { data: diplomaSteps } = await supabase
    .from('skill_steps')
    .select('id, skill_id')
    .in('skill_id', diplomaIds);
  if (!diplomaSteps?.length) return [];

  const stepsBySkill: Record<string, string[]> = {};
  for (const s of diplomaSteps) {
    const sid = s.skill_id as string;
    (stepsBySkill[sid] ??= []).push(s.id as string);
  }

  // 2. All children with their parent
  const { data: children } = await supabase
    .from('children')
    .select(`
      id, first_name, last_name, name, parent_id,
      profiles:parent_id ( first_name, last_name )
    `)
    .eq('active', true);
  if (!children?.length) return [];

  const childIds = children.map(c => c.id as string);

  // 3. All progress on diploma steps for these kids
  const allDiplomaStepIds = diplomaSteps.map(s => s.id as string);
  const { data: phases } = await supabase
    .from('child_skill_step_progress')
    .select('child_id, skill_step_id, phase')
    .in('child_id', childIds)
    .in('skill_step_id', allDiplomaStepIds);

  // 4. Compute per-child / per-diploma readiness
  const out: AdminExamCandidate[] = [];
  for (const ch of children) {
    const cid = ch.id as string;
    const childName = (ch.name as string) ||
      `${ch.first_name ?? ''} ${ch.last_name ?? ''}`.trim() || 'Onbekend';
    const p = ch.profiles as { first_name?: string; last_name?: string } | null;
    const parentName = `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend';

    for (const dip of diplomaSkills) {
      const stepIds = stepsBySkill[dip.id as string] ?? [];
      if (!stepIds.length) continue;
      const dipPhases = (phases ?? []).filter(p =>
        p.child_id === cid && stepIds.includes(p.skill_step_id as string));
      if (!dipPhases.length) continue; // not started yet
      const mastered = dipPhases.filter(p => (p.phase as number) >= 4).length;
      const total = stepIds.length;
      out.push({
        childId: cid,
        childName,
        parentId: (ch.parent_id as string) ?? '',
        parentName,
        diplomaLevel: ((dip.level as string).replace('Diploma ', '') || 'A') as 'A' | 'B' | 'C',
        totalItems: total,
        itemsMastered: mastered,
        percent: Math.round((mastered / total) * 100),
        readyForExam: mastered === total,
      });
    }
  }
  return out.sort((a, b) => b.percent - a.percent);
}

// ═══════════════════════════════════════════════════════════════════════════
//   WAITLIST OFFERS — 24h slot-claim challenges
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminWaitlistOffer {
  id: string;
  waitlistId: string;
  lessonId: string;
  parentName: string;
  childName: string;
  lessonDate: string;
  lessonTime: string;
  location: string;
  offeredAt: string;
  expiresAt: string;
  claimedAt: string | null;
  declinedAt: string | null;
  status: 'pending' | 'claimed' | 'declined' | 'expired';
  hoursRemaining: number;
}

export async function fetchWaitlistOffers(): Promise<AdminWaitlistOffer[]> {
  const { data } = await supabase
    .from('waitlist_offers')
    .select(`
      id, waitlist_id, lesson_id, offered_at, expires_at, claimed_at, declined_at,
      waitlist:waitlist_id (
        parent_id, child_id,
        profiles:parent_id ( first_name, last_name ),
        children:child_id ( name, first_name, last_name )
      ),
      lessons:lesson_id (
        date, start_time, end_time,
        locations:location_id ( name )
      )
    `)
    .order('offered_at', { ascending: false })
    .limit(100);

  const now = Date.now();
  return (data ?? []).map((o: Record<string, unknown>) => {
    const w = o.waitlist as { profiles?: { first_name?: string; last_name?: string }; children?: { name?: string; first_name?: string; last_name?: string } } | null;
    const l = o.lessons as { date?: string; start_time?: string; end_time?: string; locations?: { name?: string } } | null;
    const expires = new Date(o.expires_at as string).getTime();
    const claimed = !!o.claimed_at;
    const declined = !!o.declined_at;
    const expired = !claimed && !declined && expires < now;
    const status: AdminWaitlistOffer['status'] = claimed ? 'claimed' : declined ? 'declined' : expired ? 'expired' : 'pending';
    const hoursRemaining = Math.max(0, Math.round((expires - now) / 1000 / 3600 * 10) / 10);
    return {
      id: o.id as string,
      waitlistId: o.waitlist_id as string,
      lessonId: o.lesson_id as string,
      parentName: `${w?.profiles?.first_name ?? ''} ${w?.profiles?.last_name ?? ''}`.trim() || 'Onbekend',
      childName: w?.children?.name || `${w?.children?.first_name ?? ''} ${w?.children?.last_name ?? ''}`.trim() || '—',
      lessonDate: l?.date ?? '',
      lessonTime: `${(l?.start_time ?? '').slice(0, 5)}–${(l?.end_time ?? '').slice(0, 5)}`,
      location: l?.locations?.name ?? '—',
      offeredAt: o.offered_at as string,
      expiresAt: o.expires_at as string,
      claimedAt: (o.claimed_at as string) ?? null,
      declinedAt: (o.declined_at as string) ?? null,
      status,
      hoursRemaining,
    };
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//   RESERVATIONS (all bookings with full join data)
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminReservation {
  id: string;
  customerName: string;
  childName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  instructorName: string;
  status: string;
  paymentStatus: string;
  amountCents: number;
  createdAt: string;
}

export async function fetchAllReservations(): Promise<AdminReservation[]> {
  const { data } = await supabase
    .from('reservations')
    .select(`
      id, status, payment_status, amount_cents, created_at,
      profiles:parent_id ( first_name, last_name ),
      children:child_id ( first_name, last_name ),
      lessons:lesson_id (
        date, start_time, end_time, type,
        locations:location_id ( name ),
        instructor:instructor_id ( first_name, last_name )
      )
    `)
    .order('created_at', { ascending: false });

  return (data ?? []).map(r => {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const c = r.children as { first_name?: string; last_name?: string } | null;
    const l = r.lessons as {
      date?: string; start_time?: string; end_time?: string; type?: string;
      locations?: { name?: string } | null;
      instructor?: { first_name?: string; last_name?: string } | null;
    } | null;
    return {
      id: r.id as string,
      customerName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      childName: `${c?.first_name ?? ''} ${c?.last_name ?? ''}`.trim(),
      date: l?.date ?? '',
      startTime: (l?.start_time ?? '').slice(0, 5),
      endTime: (l?.end_time ?? '').slice(0, 5),
      type: l?.type ?? '1-op-1',
      location: l?.locations?.name ?? '—',
      instructorName: `${l?.instructor?.first_name ?? ''} ${l?.instructor?.last_name ?? ''}`.trim() || '—',
      status: (r.status as string) ?? 'confirmed',
      paymentStatus: (r.payment_status as string) ?? 'pending',
      amountCents: (r.amount_cents as number) ?? 0,
      createdAt: r.created_at as string,
    };
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//   LOCATIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  postcode: string;
  active: boolean;
  upcomingLessons: number;
  totalStudents: number;
}

export async function fetchLocations(): Promise<AdminLocation[]> {
  const { data: locs } = await supabase
    .from('locations')
    .select('id, name, city, address, postcode, active')
    .order('name');
  if (!locs?.length) return [];

  const today = new Date().toISOString().slice(0, 10);

  // Upcoming lessons per location
  const { data: lessons } = await supabase
    .from('lessons')
    .select('location_id, date')
    .gte('date', today);
  const lessonsCount: Record<string, number> = {};
  for (const l of lessons ?? []) {
    const id = l.location_id as string;
    lessonsCount[id] = (lessonsCount[id] ?? 0) + 1;
  }

  // Distinct students with reservations per location
  const { data: res } = await supabase
    .from('reservations')
    .select('child_id, lessons:lesson_id ( location_id )')
    .eq('status', 'confirmed');
  const studentSet: Record<string, Set<string>> = {};
  for (const r of res ?? []) {
    const lesson = r.lessons as { location_id?: string } | null;
    const lid = lesson?.location_id;
    const cid = r.child_id as string | null;
    if (!lid || !cid) continue;
    (studentSet[lid] ??= new Set()).add(cid);
  }

  return locs.map(l => ({
    id: l.id as string,
    name: l.name as string,
    city: (l.city as string) ?? '',
    address: (l.address as string) ?? '',
    postcode: (l.postcode as string) ?? '',
    active: (l.active as boolean) ?? true,
    upcomingLessons: lessonsCount[l.id as string] ?? 0,
    totalStudents: studentSet[l.id as string]?.size ?? 0,
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
//   INSTRUCTORS (profiles with role = 'instructor')
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminInstructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  upcomingLessons: number;
  studentCount: number;
}

export async function fetchInstructors(): Promise<AdminInstructor[]> {
  const { data: list } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, phone, city')
    .in('role', ['instructor', 'admin'])
    .order('first_name');
  if (!list?.length) return [];

  const ids = list.map(i => i.id as string);
  const today = new Date().toISOString().slice(0, 10);

  const { data: lessons } = await supabase
    .from('lessons')
    .select('instructor_id, date')
    .in('instructor_id', ids)
    .gte('date', today);
  const lessonsCount: Record<string, number> = {};
  for (const l of lessons ?? []) {
    const id = l.instructor_id as string;
    lessonsCount[id] = (lessonsCount[id] ?? 0) + 1;
  }

  // Distinct students per instructor (via reservations join lessons)
  const { data: res } = await supabase
    .from('reservations')
    .select('child_id, lessons:lesson_id ( instructor_id )')
    .eq('status', 'confirmed');
  const studentSet: Record<string, Set<string>> = {};
  for (const r of res ?? []) {
    const lesson = r.lessons as { instructor_id?: string } | null;
    const iid = lesson?.instructor_id;
    const cid = r.child_id as string | null;
    if (!iid || !cid) continue;
    (studentSet[iid] ??= new Set()).add(cid);
  }

  return list.map(i => ({
    id: i.id as string,
    name: `${i.first_name ?? ''} ${i.last_name ?? ''}`.trim() || (i.email as string),
    email: (i.email as string) ?? '',
    phone: (i.phone as string) ?? '',
    city: (i.city as string) ?? '',
    upcomingLessons: lessonsCount[i.id as string] ?? 0,
    studentCount: studentSet[i.id as string]?.size ?? 0,
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
//   WALLETS / TEGOED
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminWallet {
  id: string;
  parentId: string;
  parentName: string;
  parentEmail: string;
  balanceCents: number;
  initialAmountCents: number;
  bonusCents: number;
  createdAt: string;
}

export async function fetchWallets(): Promise<AdminWallet[]> {
  const { data } = await supabase
    .from('credit_vouchers')
    .select(`
      id, current_balance_cents, initial_amount_cents, bonus_cents, created_at, parent_id,
      profiles:parent_id ( first_name, last_name, email )
    `)
    .order('created_at', { ascending: false });

  return (data ?? []).map(v => {
    const p = v.profiles as { first_name?: string; last_name?: string; email?: string } | null;
    return {
      id: v.id as string,
      parentId: v.parent_id as string,
      parentName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || (p?.email ?? 'Onbekend'),
      parentEmail: p?.email ?? '',
      balanceCents: (v.current_balance_cents as number) ?? 0,
      initialAmountCents: (v.initial_amount_cents as number) ?? 0,
      bonusCents: (v.bonus_cents as number) ?? 0,
      createdAt: v.created_at as string,
    };
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//   REVIEWS (all + approval queue for <6)
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminReview {
  id: string;
  parentName: string;
  rating: number;
  text: string;
  helpfulCount: number;
  location: string;
  instructorName: string;
  ownerResponse: string | null;
  published: boolean;
  createdAt: string;
}

export async function fetchAllReviews(): Promise<AdminReview[]> {
  const { data } = await supabase
    .from('reviews')
    .select(`
      id, rating, text, helpful_count, owner_response, published, created_at,
      profiles:parent_id ( first_name, last_name ),
      locations:location_id ( name ),
      instructor:instructor_id ( first_name, last_name )
    `)
    .order('created_at', { ascending: false });

  return (data ?? []).map(r => {
    const p = r.profiles as { first_name?: string; last_name?: string } | null;
    const loc = r.locations as { name?: string } | null;
    const inst = r.instructor as { first_name?: string; last_name?: string } | null;
    return {
      id: r.id as string,
      parentName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Anoniem',
      rating: (r.rating as number) ?? 0,
      text: (r.text as string) ?? '',
      helpfulCount: (r.helpful_count as number) ?? 0,
      location: loc?.name ?? '',
      instructorName: `${inst?.first_name ?? ''} ${inst?.last_name ?? ''}`.trim(),
      ownerResponse: (r.owner_response as string) ?? null,
      published: (r.published as boolean) ?? false,
      createdAt: r.created_at as string,
    };
  });
}

export async function respondToReview(reviewId: string, response: string): Promise<void> {
  await supabase
    .from('reviews')
    .update({
      owner_response: response,
      responded_at: new Date().toISOString(),
      published: true,
    })
    .eq('id', reviewId);
}

// ═══════════════════════════════════════════════════════════════════════════
//   WAITLIST
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminWaitlistEntry {
  id: string;
  parentName: string;
  childName: string;
  preferredDays: string[];
  preferredLocationIds: string[];
  preferredLocationNames: string[];
  preferredTimeStart: string | null;   // HH:MM:SS or null
  preferredTimeEnd: string | null;
  position: number;
  registrationFeePaid: boolean;
  joinedAt: string;
}

export async function fetchWaitlist(): Promise<AdminWaitlistEntry[]> {
  // 1. Load every location once so we can map IDs → names without an N+1
  const { data: locs } = await supabase
    .from('locations')
    .select('id, name');
  const locById = new Map<string, string>(
    (locs ?? []).map(l => [l.id as string, l.name as string])
  );

  const { data } = await supabase
    .from('waitlist')
    .select(`
      id, preferred_days, preferred_location_ids, preferred_time_start, preferred_time_end,
      position, registration_fee_paid, joined_at,
      profiles:parent_id ( first_name, last_name ),
      children:child_id ( first_name, last_name )
    `)
    .order('position', { ascending: true });

  return (data ?? []).map(w => {
    const p = w.profiles as { first_name?: string; last_name?: string } | null;
    const c = w.children as { first_name?: string; last_name?: string } | null;
    const locIds = (w.preferred_location_ids as string[]) ?? [];
    return {
      id: w.id as string,
      parentName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
      childName: `${c?.first_name ?? ''} ${c?.last_name ?? ''}`.trim(),
      preferredDays: ((w.preferred_days as string[]) ?? []),
      preferredLocationIds: locIds,
      preferredLocationNames: locIds.map(id => locById.get(id) ?? '?').filter(n => n !== '?'),
      preferredTimeStart: (w.preferred_time_start as string | null) ?? null,
      preferredTimeEnd: (w.preferred_time_end as string | null) ?? null,
      position: (w.position as number) ?? 0,
      registrationFeePaid: (w.registration_fee_paid as boolean) ?? false,
      joinedAt: w.joined_at as string,
    };
  });
}

/// Walter 2026-05-18 — admin can remove a wachtlijst entry directly from the
/// overview. Cascade-deletes the waitlist_offers via the existing FK ON
/// DELETE CASCADE so we don't need to clean up anywhere else.
export async function deleteWaitlistEntry(id: string): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from('waitlist').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════════════════
//   VACATION REQUESTS (instructor side)
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminVacationRequest {
  id: string;
  instructorName: string;
  startDate: string;
  endDate: string;
  reason: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export async function fetchVacationRequests(): Promise<AdminVacationRequest[]> {
  const { data } = await supabase
    .from('vacation_requests')
    .select(`
      id, start_date, end_date, reason, notes, status, created_at,
      profiles:instructor_id ( first_name, last_name )
    `)
    .order('created_at', { ascending: false });

  return (data ?? []).map(v => {
    const p = v.profiles as { first_name?: string; last_name?: string } | null;
    return {
      id: v.id as string,
      instructorName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Instructeur',
      startDate: v.start_date as string,
      endDate: v.end_date as string,
      reason: (v.reason as string) ?? '',
      notes: (v.notes as string) ?? '',
      status: (v.status as 'pending' | 'approved' | 'rejected') ?? 'pending',
      createdAt: v.created_at as string,
    };
  });
}

export async function decideVacationRequest(id: string, approve: boolean): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase
    .from('vacation_requests')
    .update({
      status: approve ? 'approved' : 'rejected',
      reviewed_by: user?.id ?? null,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id);
}

// ═══════════════════════════════════════════════════════════════════════════
//   NOTIFICATIONS (admin can send announcements)
// ═══════════════════════════════════════════════════════════════════════════

export async function broadcastNotification(opts: {
  audience: 'parent' | 'instructor' | 'all';
  title: string;
  body: string;
  type?: string;
}): Promise<number> {
  const roles = opts.audience === 'all' ? ['parent', 'instructor'] : [opts.audience];
  const { data: targets } = await supabase
    .from('profiles')
    .select('id')
    .in('role', roles);
  if (!targets?.length) return 0;

  const rows = targets.map(t => ({
    user_id: t.id,
    audience: opts.audience,
    type: opts.type ?? 'announcement',
    title: opts.title,
    body: opts.body,
    read: false,
  }));
  await supabase.from('notifications').insert(rows);
  return rows.length;
}

// ─── Admin notifications inbox ───
export interface AdminNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

/// Fetches notifications for the current authenticated admin user.
export async function fetchAdminNotifications(limit = 30): Promise<AdminNotification[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from('notifications')
    .select('id, type, title, body, read, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(r => ({
    id: r.id as string,
    type: (r.type as string) ?? 'announcement',
    title: (r.title as string) ?? '',
    body: (r.body as string) ?? '',
    read: (r.read as boolean) ?? false,
    createdAt: r.created_at as string,
  }));
}

/// Marks all current-user notifications as read.
export async function markAllNotificationsRead(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', user.id)
    .eq('read', false);
}

/// Marks one notification as read.
export async function markNotificationRead(id: string): Promise<void> {
  await supabase.from('notifications').update({ read: true }).eq('id', id);
}

// ═══════════════════════════════════════════════════════════════════════════
//   PROGRESS / SKILLS / CURRICULUM
// ═══════════════════════════════════════════════════════════════════════════

export interface AdminSkill {
  id: string;
  name: string;
  level: string;
  description: string;
  sortOrder: number;
}

export async function fetchAllSkills(): Promise<AdminSkill[]> {
  const { data } = await supabase
    .from('skills')
    .select('id, name, level, description, sort_order')
    .order('sort_order', { ascending: true });
  return (data ?? []).map(s => ({
    id: s.id as string,
    name: s.name as string,
    level: (s.level as string) ?? 'Beginner',
    description: (s.description as string) ?? '',
    sortOrder: (s.sort_order as number) ?? 0,
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
//   FULL CURRICULUM (Walter 2026-04-30) — 7 steps, each with checklist groups
// ═══════════════════════════════════════════════════════════════════════════

export interface CurriculumStep {
  id: string;
  name: string;
  level: string;
  shortDescription: string;
  extendedDescription: string;     // The (i) modal long-form content (markdown-ish)
  childrenLanguage: string | null; // Kid-friendly phrasing
  prerequisiteSkillId: string | null;
  sortOrder: number;
  groups: CurriculumGroup[];       // Checklist items grouped by category
}

export interface CurriculumGroup {
  category: string;
  label: string;
  subtitle: string;
  items: CurriculumItem[];
}

export interface CurriculumItem {
  id: string;
  description: string;
  stepOrder: number;
}

// ─── Cascade + level derivation (mirrors mobile app — Walter 2026-05-13) ───

/// Walter 2026-05-13: "Step 2 should only become available once Step 1 has
/// been fully completed (or the two parts of Step 1: floating on the back
/// and independent movement). The same should apply for all following steps."
///
/// Default rule:    all items at fase 4.
/// Step 1 exception: also unlocks when the "basisvaardigheden" group
///                   (zelfstandig op de rug drijven + zich voortbewegen)
///                   is on fase 4.
export function isStepCompleteForUnlock(
  step: CurriculumStep,
  phases: Record<string, number>,
): boolean {
  const allItems = step.groups.flatMap(g => g.items);
  if (allItems.length === 0) return false;
  const atFase4 = (it: CurriculumItem) => (phases[it.id] ?? 1) >= 4;

  if (allItems.every(atFase4)) return true;

  if (step.level === 'Stap 1') {
    const basis = step.groups
      .filter(g => g.category === 'basisvaardigheden')
      .flatMap(g => g.items);
    if (basis.length > 0 && basis.every(atFase4)) return true;
  }
  return false;
}

/// Walter 2026-05-13 — derive the child's level automatically from their
/// cumulative progress through the curriculum. Admin and mobile MUST stay
/// in sync. Rules (cumulative — last matching wins):
///   • 0–2 stappen mastered     → "Beginner"
///   • 3–5 stappen mastered     → "Gevorderd Beginner"
///   • 6–7 stappen mastered     → "Gevorderd"
///   • Diploma A items mastered → "Diploma A"
///   • Diploma B items mastered → "Diploma B"
///   • Diploma C items mastered → "Diploma C"
export function deriveChildLevel(
  steps: CurriculumStep[],
  phases: Record<string, number>,
): string {
  const stepDone = (s: CurriculumStep) => {
    const items = s.groups.flatMap(g => g.items);
    return items.length > 0 && items.every(it => (phases[it.id] ?? 1) >= 4);
  };

  const stappen = steps
    .filter(s => !s.level.startsWith('Diploma '))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const stappenDone = stappen.filter(stepDone).length;

  let level: string;
  if (stappenDone <= 2) level = 'Beginner';
  else if (stappenDone <= 5) level = 'Gevorderd Beginner';
  else level = 'Gevorderd';

  for (const letter of ['A', 'B', 'C']) {
    const diploma = steps.find(s => s.level === `Diploma ${letter}`);
    if (diploma && stepDone(diploma)) level = `Diploma ${letter}`;
  }
  return level;
}

// ─── Per-child progress ───

export interface ChildSummary {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  level: string;
  parentId: string;
  parentName: string;
}

/// All children system-wide — for admin pickers.
export async function fetchAllChildren(): Promise<ChildSummary[]> {
  const { data } = await supabase
    .from('children')
    .select(`
      id, first_name, last_name, date_of_birth, level, parent_id,
      profiles:parent_id ( first_name, last_name )
    `)
    .eq('active', true)
    .order('first_name');
  const today = new Date();
  return (data ?? []).map(c => {
    const dob = new Date(c.date_of_birth as string);
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) age--;
    const p = c.profiles as { first_name?: string; last_name?: string } | null;
    return {
      id: c.id as string,
      firstName: (c.first_name as string) ?? '',
      lastName: (c.last_name as string) ?? '',
      age,
      level: (c.level as string) ?? 'Beginner',
      parentId: (c.parent_id as string) ?? '',
      parentName: `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim() || 'Onbekend',
    };
  });
}

/// Map of skill_step_id → phase (1-4) for one child.
export async function fetchChildPhases(childId: string): Promise<Record<string, number>> {
  const { data } = await supabase
    .from('child_skill_step_progress')
    .select('skill_step_id, phase')
    .eq('child_id', childId);
  const map: Record<string, number> = {};
  for (const r of data ?? []) {
    map[r.skill_step_id as string] = (r.phase as number) ?? 1;
  }
  return map;
}

/// Tap on a phase circle — upserts the row.
export async function upsertChildPhase(opts: {
  childId: string;
  stepItemId: string;
  phase: number;
}): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('child_skill_step_progress').upsert(
    {
      child_id: opts.childId,
      skill_step_id: opts.stepItemId,
      phase: opts.phase,
      updated_at: new Date().toISOString(),
      updated_by: user?.id ?? null,
    },
    { onConflict: 'child_id,skill_step_id' },
  );
}

export async function fetchCurriculum(): Promise<CurriculumStep[]> {
  // 1. Fetch all skills (steps) ordered by sort_order
  const { data: skillsRows, error: sErr } = await supabase
    .from('skills')
    .select('id, name, level, description, extended_description, children_language, prerequisite_skill_id, sort_order')
    .order('sort_order', { ascending: true });
  if (sErr || !skillsRows?.length) return [];

  // 2. Fetch all skill_steps in one query
  const { data: stepRows } = await supabase
    .from('skill_steps')
    .select('id, skill_id, step_order, description, category, category_label, category_subtitle')
    .order('step_order', { ascending: true });

  // 3. Group steps by skill_id, then by category
  const stepsBySkill: Record<string, typeof stepRows> = {};
  for (const r of stepRows ?? []) {
    const sid = r.skill_id as string;
    (stepsBySkill[sid] ??= []).push(r);
  }

  return skillsRows.map(s => {
    const allSteps = stepsBySkill[s.id as string] ?? [];

    // Group by category preserving first-seen order
    const groupMap = new Map<string, CurriculumGroup>();
    for (const r of allSteps) {
      const cat = (r.category as string) ?? 'general';
      if (!groupMap.has(cat)) {
        groupMap.set(cat, {
          category: cat,
          label: (r.category_label as string) ?? 'Checklist',
          subtitle: (r.category_subtitle as string) ?? '',
          items: [],
        });
      }
      groupMap.get(cat)!.items.push({
        id: r.id as string,
        description: r.description as string,
        stepOrder: (r.step_order as number) ?? 0,
      });
    }

    return {
      id: s.id as string,
      name: s.name as string,
      level: (s.level as string) ?? '',
      shortDescription: (s.description as string) ?? '',
      extendedDescription: (s.extended_description as string) ?? '',
      childrenLanguage: (s.children_language as string) ?? null,
      prerequisiteSkillId: (s.prerequisite_skill_id as string) ?? null,
      sortOrder: (s.sort_order as number) ?? 0,
      groups: Array.from(groupMap.values()),
    };
  });
}
