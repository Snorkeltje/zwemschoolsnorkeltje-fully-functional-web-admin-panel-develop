import { MobileFrame } from '../components/layout/MobileFrame';
import { BottomNav } from '../components/layout/BottomNav';

const todayNotifs = [
  { emoji: '📅', emojiBg: '#E1EDF8', title: 'Lesherinnering', subtitle: 'Morgen ma 15:00 — De Bilt Zwembad', time: 'Nu', unread: true },
  { emoji: '📊', emojiBg: '#FFEBE0', title: 'Voortgang bijgewerkt', subtitle: "Jan heeft Sami's voortgang van vandaag", time: '2u', unread: true },
  { emoji: '💳', emojiBg: '#FDE7E7', title: 'Knipkaart bijna op', subtitle: 'Knipkaart loopt af: nog 3 lessen resterend', time: '1d', unread: true },
];

const earlierNotifs = [
  { emoji: '✅', emojiBg: '#E3F7ED', title: 'Les geboekt', subtitle: 'Extra 1-op-1 geboekt voor 30 apr om 16:00', time: '2d', unread: false },
  { emoji: '💰', emojiBg: '#E3F7ED', title: 'Terugbetaling', subtitle: '€5,00 terugbetaald — les omgezet naar 1-op-2', time: '3d', unread: false },
  { emoji: '💬', emojiBg: '#E1EDF8', title: 'Nieuw bericht', subtitle: 'Jan de Vries: Tot maandag om 15:00 🏊', time: '3d', unread: false },
];

export function NotificationsScreen() {
  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F4F7FC] pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-14 pb-3 flex items-center justify-between">
          <div style={{ width: 60 }} />
          <p className="text-[#131827]" style={{ fontSize: 18, fontWeight: 700 }}>Meldingen</p>
          <button className="text-[#0365C4]" style={{ fontSize: 13, fontWeight: 500 }}>Alles gelezen</button>
        </div>

        <div className="px-5 pt-2">
          {/* Today */}
          <p className="text-[#818EA6] mb-2" style={{ fontSize: 12, fontWeight: 500 }}>Vandaag</p>
          <div className="space-y-2">
            {todayNotifs.map((n, i) => (
              <div key={i} className="bg-[#F4F7FD] rounded-xl px-4 py-3 flex items-center gap-3 relative">
                {n.unread && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0365C4]" />}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: n.emojiBg }}>
                  <span style={{ fontSize: 20 }}>{n.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#131827]" style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</p>
                  <p className="text-[#818EA6] truncate" style={{ fontSize: 11 }}>{n.subtitle}</p>
                </div>
                <span className="text-[#818EA6] flex-shrink-0" style={{ fontSize: 11 }}>{n.time}</span>
              </div>
            ))}
          </div>

          {/* Earlier */}
          <p className="text-[#818EA6] mt-4 mb-2" style={{ fontSize: 12, fontWeight: 500 }}>Eerder</p>
          <div className="space-y-2">
            {earlierNotifs.map((n, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: n.emojiBg }}>
                  <span style={{ fontSize: 20 }}>{n.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#131827]" style={{ fontSize: 13 }}>{n.title}</p>
                  <p className="text-[#818EA6] truncate" style={{ fontSize: 11 }}>{n.subtitle}</p>
                </div>
                <span className="text-[#818EA6] flex-shrink-0" style={{ fontSize: 11 }}>{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileFrame>
  );
}
