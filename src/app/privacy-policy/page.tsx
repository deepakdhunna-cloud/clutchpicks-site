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

      <section className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl tracking-wider mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-12">
            Effective Date: March 1, 2026 &middot; Last Updated: July 20, 2026
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
                  Account information: such as your name or display name, email address,
                  and authentication credentials or tokens (including if you use Sign in
                  with Apple).
                </li>
                <li>
                  Profile and preferences: such as a profile photo or bio, favorite
                  teams, notification preferences, and display settings.
                </li>
                <li>
                  Picks and activity: picks you create, watchlists, favorites, and other
                  actions taken inside the App.
                </li>
                <li>
                  Support communications and contact details: information you choose to
                  provide when contacting support, such as your name, email address,
                  optional phone number, message, and attachments.
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
                <li>Push notification tokens if you enable notifications.</li>
                <li>
                  On supported Apple devices, a derived age band and age-assurance or
                  permission status; the applicable policy, change, and permission-question
                  identifiers; App Store age-rating and install-version context; and a keyed,
                  pseudonymous identifier derived from Apple&apos;s AppTransaction identifier.
                  We do not store a date of birth, exact age, raw age-range response, or raw
                  signed JWS payload for this process.
                </li>
              </ul>

              <h3 className="text-white font-medium mb-2">
                C. Information From Third Parties (Optional)
              </h3>
              <p>
                If you use Sign in with Apple, we may receive a unique account identifier
                and limited profile details permitted by your Apple settings.
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
                  Determine whether age or permission requirements apply, enforce the
                  minimum age and any specific system permission Apple identifies as
                  legally required, and respond to a valid consent withdrawal.
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
                  Service providers: vendors that help us operate the App. They are
                  permitted to process information only on our instructions and for the
                  services they provide to us. These include:
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>
                      Railway and infrastructure providers (application hosting and data
                      storage)
                    </li>
                    <li>ESPN (sports data and scores)</li>
                    <li>
                      OpenAI and Anthropic (game and source analysis; we do not
                      intentionally send account or profile data for this analysis)
                    </li>
                    <li>
                      Apify (public sports-news and source ingestion; we do not
                      intentionally send account or profile data)
                    </li>
                    <li>RevenueCat (subscription and payment processing)</li>
                    <li>
                      Apple (authentication, subscriptions, age assurance, and any
                      applicable system permission)
                    </li>
                    <li>Resend (email verification and service emails)</li>
                    <li>Expo (push notification delivery)</li>
                    <li>Sentry (crash and error diagnostics)</li>
                    <li>Google Workspace (support email communications)</li>
                  </ul>
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
                4. Analytics and Diagnostics
              </h2>
              <p className="mb-3">
                We use limited analytics and diagnostics to understand app performance,
                troubleshoot issues, and improve the product. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>IP address</li>
                <li>App interaction events (for example, session data)</li>
                <li>
                  Device and app information (device model, OS version, app version)
                </li>
                <li>Crash and error diagnostics</li>
              </ul>
              <p className="mb-3">
                Clutch Picks does not use third-party advertising SDKs or sell personal
                information for advertising.
              </p>
              <p>
                Payments are processed by Apple through the App Store. We do not receive
                your full payment card number. RevenueCat helps us manage subscription
                status and entitlement access.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                5. Location Data
              </h2>
              <p>
                Clutch Picks does not request device-location permission and does not
                collect precise or coarse GPS location. Like most internet services, our
                systems may receive an IP address, which can indicate a general region.
                We use that information for security, diagnostics, and service operation,
                not to track your physical movements.
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
              <p className="mb-3">
                We may retain aggregated or de-identified information for analytics and
                product improvement.
              </p>
              <p>
                Where needed to honor a withdrawn platform consent and comply with
                age-assurance obligations, we may retain a minimal keyed pseudonymous
                identifier and revocation timestamp after account deletion. Delivery
                idempotency records and non-revoked orphaned identifiers are removed on a
                bounded schedule. We do not retain the raw Apple age response or signed
                AppTransaction payload.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg text-white font-semibold mb-3">
                7. Account Deletion and Your Privacy Rights
              </h2>
              <p className="mb-3">
                You can delete your account directly in the App from Settings. You may
                also contact{" "}
                <a
                  href="mailto:support@clutchpicksapp.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicksapp.com
                </a>{" "}
                from the email address linked to your account if you need help.
              </p>
              <p className="mb-3">
                When we delete your account, we remove or de-identify personal
                information associated with the account, subject to limited exceptions
                where retention is required or permitted by law.
              </p>
              <p className="mb-3">
                Deleting your Clutch Picks account does not cancel an App Store
                subscription. You must separately manage or cancel the subscription
                through your Apple account settings.
              </p>
              <p>
                Depending on where you live, you may have additional rights such as
                accessing, correcting, or deleting certain personal information. You can
                exercise these rights by contacting us at{" "}
                <a
                  href="mailto:support@clutchpicksapp.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicksapp.com
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
              <p className="mb-3">
                The App is not intended for children under 13 (or the minimum age required
                in your jurisdiction), and users identified as under 13 are not permitted
                to use it. Users ages 13 through 17 may use the App without a general
                parent or guardian permission requirement. On supported Apple devices,
                we still enforce any specific system permission Apple identifies as
                legally required for the account or region.
              </p>
              <p className="mb-3">
                Access remains restricted when such a required age or permission result is
                declined, denied, pending, unknown, unavailable, conflicting, or rescinded,
                unless and until eligibility is validly restored.
              </p>
              <p>
                We do not knowingly collect personal information from children under 13.
                If you believe a child has provided us personal information, contact{" "}
                <a
                  href="mailto:support@clutchpicksapp.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicksapp.com
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
                  href="mailto:support@clutchpicksapp.com"
                  className="text-[var(--color-coral)] hover:underline"
                >
                  support@clutchpicksapp.com
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
