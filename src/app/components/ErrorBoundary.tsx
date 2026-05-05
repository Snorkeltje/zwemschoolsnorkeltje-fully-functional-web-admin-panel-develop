import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ChevronLeft } from 'lucide-react';

interface State {
  hasError: boolean;
  error: Error | null;
  info: { componentStack?: string } | null;
}

interface Props {
  children: ReactNode;
  /// Optional title shown above the error card.
  title?: string;
  /// If false, only catches errors below this point but renders inline message
  /// without the full-page chrome (useful for narrow widget boundaries).
  fullScreen?: boolean;
}

/// Catches uncaught render errors anywhere below it. Prevents the whole admin
/// dashboard from crashing on a single bad page. Walter 2026-05-05.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, info: null };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info?.componentStack);
    this.setState({ hasError: true, error, info });
  }

  reset = () => {
    this.setState({ hasError: false, error: null, info: null });
  };

  reload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    const { title = 'Er ging iets mis', fullScreen = true } = this.props;
    const error = this.state.error;
    const isProd = import.meta.env.MODE === 'production';

    const card = (
      <div className="max-w-2xl mx-auto p-8 rounded-2xl"
           style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #FECACA' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: '#FEF2F2' }}>
            <AlertTriangle size={24} className="text-[#E74C3C]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[#1A1A2E] mb-1" style={{ fontSize: 20, fontWeight: 800 }}>{title}</h2>
            <p className="text-[#6B7B94]" style={{ fontSize: 13 }}>
              Deze pagina kon niet worden geladen. We hebben de fout vastgelegd; probeer het opnieuw of ga terug.
            </p>

            {!isProd && error && (
              <details className="mt-4 p-3 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid #E5EAF2' }} open>
                <summary className="cursor-pointer text-[#991B1B]" style={{ fontSize: 12, fontWeight: 700 }}>
                  Technische details (alleen zichtbaar in dev)
                </summary>
                <p className="mt-2 text-[#991B1B] font-mono break-all" style={{ fontSize: 11, lineHeight: 1.4 }}>
                  {error.name}: {error.message}
                </p>
                {this.state.info?.componentStack && (
                  <pre className="mt-2 text-[#6B7B94] overflow-x-auto" style={{ fontSize: 10, lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                    {this.state.info.componentStack.trim().split('\n').slice(0, 8).join('\n')}
                  </pre>
                )}
              </details>
            )}

            <div className="mt-5 flex gap-2 flex-wrap">
              <button
                onClick={this.reset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0365C4] bg-white border border-[#0365C4]/20 hover:bg-[#0365C4]/5"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                <ChevronLeft size={14} /> Probeer opnieuw
              </button>
              <button
                onClick={this.reload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white"
                style={{ fontSize: 13, fontWeight: 600, background: '#0365C4' }}
              >
                <RefreshCw size={14} /> Pagina herladen
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    if (!fullScreen) return card;

    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0F1117' }}>
        {card}
      </div>
    );
  }
}
