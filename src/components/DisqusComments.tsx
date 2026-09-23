import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
  }
}

export default function DisqusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shortname = 'ymstudio';
    const pageUrl = 'https://mgmt6110week03problemset02resalemet.vercel.app/';
    const pageIdentifier = 'home';

    // Verify #disqus_thread container is mounted in the DOM
    const threadElem = document.getElementById('disqus_thread');
    if (!threadElem && !containerRef.current) {
      return;
    }

    window.disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
    };

    const existingScript = document.getElementById('disqus-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'disqus-script';
      script.src = `https://${shortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', String(+new Date()));
      script.async = true;
      (document.head || document.body).appendChild(script);
    } else if (window.DISQUS) {
      // Container #disqus_thread is confirmed in the DOM, execute reset
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = pageUrl;
          this.page.identifier = pageIdentifier;
        },
      });
    }
  }, []);

  return (
    <section className="mt-8 pt-8 border-t border-slate-200">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <p className="text-sm sm:text-base font-semibold text-slate-700 mb-6">
          We would love to hear your feedback: let us know what worked for you and what did not!
        </p>
        <div
          id="disqus_thread"
          ref={containerRef}
          style={{ color: 'rgb(33, 33, 33)' }}
        />
      </div>
    </section>
  );
}

