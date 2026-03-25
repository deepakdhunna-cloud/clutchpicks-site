import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Clutch Picks",
  description:
    "Privacy Policy for the Clutch Picks mobile application and related services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl tracking-wider mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-12">
            Effective Date: March 1, 2026 &middot; Last Updated: March 1, 2026
          </p>

          <div className="space-y-10 text-[var(--color-text-muted)] leading-relaxed text-sm sm:text-base">
            <p>
              This Privacy Policy explains how Clutch Picks (&quot;Clutch Picks,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
              discloses, and protects information when you use the Clutch Picks mobile
              application and any related services (collectively, the &quot;App&quot;).
            </p>

            <p>
              Clutch Picks is a sports game tracking and prediction app. Users can make
              &quot;picks&quot; for personal tracking and entertainment. Clutch Picks
              does not offer gambling services, does not accept wagers, does not process
              payments for betting, and does not facilitate real-money betting or trading.
            </p>

            <p>
              By using the App, you agree to the practices described in this Privacy
              Policy.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information in three ways: (a) information you provide, (b)
                information collected automatically, and (c) information from third
                parties (if you choose to connect them).
              </p>

              <h3 className="text-white font-medium mb-2">
                A. Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  Account information (if you create an account): such as username, email
                  address, and login credentials (or authentication token if you use a
                  third-party sign-in).
                </li>
                <li>
                  Profile and preferences: such as favorite teams, notification
                  preferences, and display settings.
                </li>
                <li>
                  Picks and activity: picks you create, comments/notes you add,
                  watchlists, favorites, and other actions taken inside the App.
                </li>
                <li>
                  Support communications: information you provide if you contact support
                  (messages and any files you choose to attach).
                </li>
              </ul>

              <h3 className="text-white font-medium mb-2">
                B. Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  Device and app information: device type, operating system version, app
                  version, language, time zone, and IP address.
                </li>
                <li>
                  Usage information: pages/screens viewed, features used, session times,
                  interaction events, and referral information.
                </li>
                <li>
                  Diagnostics and performance data: crash reports, error logs, and
                  performance metrics.
                </li>
              </ul>

              <h3 className="text-white font-medium mb-2">
                C. Information From Third Parties (Optional)
              </h3>
              <p>
                If you sign in using a third-party provider (e.g., Apple, Google) or
                connect third-party services, we may receive limited information such as
                a unique account identifier and basic profile details permitted by your
                settings with that provider.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                2. How We Use Information
              </h2>
              <p className="mb-3">We use information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Provide and operate the App, including creating and maintaining
                  accounts and enabling features such as picks tracking.
                </li>
                <li>
                  Personalize your experience, including showing relevant games, teams,
                  and notifications.
                </li>
                <li>
                  Improve and secure the App, including troubleshooting, preventing
                  abuse, detecting fraud, and maintaining system integrity.
                </li>
                <li>
                  Communicate with you, including responding to support requests and
                  sending service-related messages (e.g., security or feature updates).
                </li>
                <li>
                  Analytics, to understand usage trends and improve performance and user
                  experience.
                </li>
                <li>
                  Advertising, to display ads in the App, measure ad performance, cap ad
                  frequency, combat ad fraud, and support the App&apos;s operations.
                </li>
                <li>
                  Legal and compliance purposes, such as enforcing policies and complying
                  with lawful requests.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                3. How We Share Information
              </h2>
              <p className="mb-3">We do not sell your personal information.</p>
              <p className="mb-3">
                We may share information in the following limited cases:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Service providers: vendors that help us operate the App (e.g., hosting,
                  analytics, crash reporting, customer support tools, and advertising
                  partners). They are permitted to process information only on our
                  instructions and for the services they provide to us.
                </li>
                <li>
                  Legal and safety reasons: if we believe disclosure is necessary to
                  comply with law, court order, or valid legal process; to protect rights,
                  safety, and security of Clutch Picks, our users, or others; or to
                  investigate fraud, abuse, or security incidents.
                </li>
                <li>
                  Business transfers: if we are involved in a merger, acquisition,
                  financing, reorganization, bankruptcy, or sale of assets, information
                  may be transferred as part of that transaction, subject to standard
                  confidentiality protections.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                4. Advertising, Ad Partners, and Analytics
              </h2>
              <p className="mb-3">
                Clutch Picks displays ads in the App. Advertising and analytics partners
                may collect or receive certain information to provide ads, measure
                performance, and prevent fraud. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  Device identifiers (such as an advertising ID where permitted)
                </li>
                <li>IP address</li>
                <li>
                  Approximate location inferred from IP (not precise GPS unless you
                  explicitly grant it)
                </li>
                <li>
                  App interaction events (e.g., ad impressions/clicks, session data)
                </li>
                <li>
                  Device and app information (device model, OS version, app version)
                </li>
              </ul>

              <p className="text-white font-medium mb-2">
                Your choices and controls:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  You can limit ad tracking or reset your advertising identifier using
                  your device settings (where available).
                </li>
                <li>
                  On iOS, you can control whether apps can request to track you (App
                  Tracking Transparency) and manage tracking permissions in system
                  settings.
                </li>
                <li>
                  You can also control certain analytics permissions through OS-level
                  controls where offered by Apple/Android.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                5. Location Data
              </h2>
              <p>
                Clutch Picks does not require precise location data to function. If the
                App ever requests location permissions, it will be optional and used only
                for the purpose disclosed at the time you grant permission. You can
                disable location permissions at any time in your device settings.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                6. Data Retention
              </h2>
              <p className="mb-3">
                We retain information only as long as reasonably necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Provide the App</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce agreements</li>
                <li>Maintain security and prevent abuse</li>
              </ul>
              <p>
                Retention periods vary depending on the type of data and why we collected
                it. We may retain aggregated or de-identified information for analytics
                and product improvement.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                7. Account Deletion and Your Privacy Rights
              </h2>
              <p className="mb-3">
                You may request deletion of your account and associated personal
                information by emailing{" "}
                <a
                  href="mailto:support@clutchpicks.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicks.com
                </a>{" "}
                from the email address linked to your account and including the subject
                line: &quot;Delete My Clutch Picks Account.&quot;
              </p>
              <p className="mb-3">
                When we delete your account, we remove or de-identify personal
                information associated with the account, subject to limited exceptions
                where retention is required or permitted by law (for example, security
                logs, fraud prevention records, or compliance obligations).
              </p>
              <p>
                Depending on where you live, you may have additional rights such as
                accessing, correcting, or deleting certain personal information. You can
                exercise these rights by contacting us at{" "}
                <a
                  href="mailto:support@clutchpicks.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicks.com
                </a>
                .
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                8. Security
              </h2>
              <p>
                We use reasonable administrative, technical, and organizational
                safeguards designed to protect information. However, no method of
                transmission or storage is 100% secure. You use the App at your own risk.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                9. Children&apos;s Privacy
              </h2>
              <p>
                The App is not intended for children under 13 (or the minimum age
                required in your jurisdiction). We do not knowingly collect personal
                information from children under 13. If you believe a child has provided
                us personal information, contact{" "}
                <a
                  href="mailto:support@clutchpicks.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicks.com
                </a>{" "}
                and we will take appropriate steps to delete it.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                10. International Users
              </h2>
              <p>
                If you access the App from outside the United States, you understand that
                information may be processed and stored in the United States or other
                countries where our service providers operate. Those countries may have
                different data protection laws than your jurisdiction.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                11. Third-Party Links and Services
              </h2>
              <p>
                The App may include links to third-party sites or services (for example,
                sports data sources or content providers). We are not responsible for the
                privacy practices of third parties. Your use of third-party services is
                governed by their policies.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                12. Sports Predictions, Picks, and No Gambling Position
              </h2>
              <p className="mb-3">
                Clutch Picks provides sports tracking, prediction features, and tools
                that allow you to record picks for personal use.
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>
                  No wagering: The App does not enable placing bets, staking money,
                  trading contracts, or participating in gambling through the App.
                </li>
                <li>
                  Entertainment and informational use: predictions, rankings, and picks
                  are provided for informational/entertainment purposes and may be
                  incorrect.
                </li>
                <li>
                  User responsibility: you are responsible for how you use information
                  from the App.
                </li>
              </ul>
              <p>
                This section is provided for clarity and does not change how we handle
                data, but it explains the nature of the service.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. If we make material
                changes, we will provide notice within the App and/or update the
                &quot;Last Updated&quot; date above. Your continued use of the App after
                an update means you accept the updated policy.
              </p>
            </div>

            {/* Section 14 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                14. Contact Us
              </h2>
              <p className="mb-3">
                If you have questions, requests, or complaints about this Privacy Policy
                or our privacy practices, contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@clutchpicks.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicks.com
                </a>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-xs text-[var(--color-text-muted)]/50">
                &copy; 2026 Clutch Picks. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
