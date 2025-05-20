import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <p className="mb-4">Last updated: May 19, 2025</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to Sika Egypt's website. These Terms and Conditions govern your use of our website and the
                  purchase of products through our online platform.
                </p>
                <p>
                  By accessing our website and/or placing an order, you confirm that you have read, understood, and
                  agree to be bound by these Terms and Conditions in their entirety. If you do not agree to these Terms
                  and Conditions, you must not use our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Definitions</h2>
                <p className="mb-4">In these Terms and Conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>"We", "us", "our", and "Sika" refer to Sika Egypt for Construction Chemicals S.A.E.</li>
                  <li>"Website" refers to the website located at www.sika-egypt.com and all associated subdomains.</li>
                  <li>
                    "You" and "your" refer to the individual accessing or using our Website, or the company or
                    organization on whose behalf that individual is accessing or using our Website.
                  </li>
                  <li>"Products" refers to the items offered for sale on our Website.</li>
                  <li>"Order" refers to your request to purchase Products from us.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Account Registration</h2>
                <p className="mb-4">
                  To place an order on our Website, you may need to register for an account. When you register, you
                  agree to provide accurate, current, and complete information about yourself.
                </p>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account and password and for
                  restricting access to your computer. You agree to accept responsibility for all activities that occur
                  under your account.
                </p>
                <p>
                  We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders
                  at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Products and Pricing</h2>
                <p className="mb-4">
                  All Products displayed on our Website are subject to availability. We reserve the right to discontinue
                  any Product at any time.
                </p>
                <p className="mb-4">
                  Prices for Products are subject to change without notice. We make every effort to ensure that prices
                  displayed on our Website are correct, but errors may occur. If we discover an error in the price of
                  Products you have ordered, we will inform you as soon as possible and give you the option of
                  reconfirming your Order at the correct price or canceling it.
                </p>
                <p>
                  All prices are inclusive of VAT (Value Added Tax) at the applicable rate, unless otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Orders and Payment</h2>
                <p className="mb-4">
                  When you place an Order through our Website, you are offering to purchase Products subject to these
                  Terms and Conditions. We will send you an Order confirmation email with your Order number and details
                  of the Products you have ordered.
                </p>
                <p className="mb-4">
                  Payment can be made by credit/debit card, bank transfer, or cash on delivery, as specified during the
                  checkout process. By submitting an Order, you represent and warrant that you are authorized to use the
                  designated payment method.
                </p>
                <p>
                  We reserve the right to refuse or cancel an Order for any reason, including but not limited to Product
                  availability, errors in Product or pricing information, or problems identified by our fraud detection
                  systems.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Delivery</h2>
                <p className="mb-4">
                  We will deliver the Products to the delivery address you provide during the checkout process. Delivery
                  times are estimates only and cannot be guaranteed. We are not responsible for delays that are beyond
                  our control.
                </p>
                <p className="mb-4">
                  Risk of loss and damage to Products passes to you upon delivery. You are responsible for inspecting
                  the Products upon delivery and reporting any damages or discrepancies within 48 hours.
                </p>
                <p>
                  Additional delivery charges may apply based on your location and the size/weight of your Order. These
                  charges will be clearly displayed during the checkout process.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Returns and Refunds</h2>
                <p className="mb-4">
                  You may return Products within 14 days of delivery, provided they are in their original condition and
                  packaging. Certain Products, such as custom-mixed or tinted items, cannot be returned unless they are
                  defective.
                </p>
                <p className="mb-4">
                  To initiate a return, please contact our customer service team. You are responsible for the cost of
                  returning the Products unless they are defective or we delivered them in error.
                </p>
                <p>
                  Refunds will be processed within 14 days of receiving the returned Products, using the same payment
                  method used for the original purchase.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Intellectual Property</h2>
                <p className="mb-4">
                  All content on our Website, including but not limited to text, graphics, logos, images, audio clips,
                  digital downloads, and software, is the property of Sika or its content suppliers and is protected by
                  international copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, display, sell, lease, transmit, create derivative works from,
                  translate, modify, reverse-engineer, disassemble, decompile, or otherwise exploit our Website or any
                  portion of it unless expressly permitted by us in writing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="mb-4">
                  To the fullest extent permitted by law, Sika shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
                  from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use of or inability to use our Website;</li>
                  <li>
                    Any unauthorized access to or use of our servers and/or any personal information stored therein;
                  </li>
                  <li>Any interruption or cessation of transmission to or from our Website;</li>
                  <li>
                    Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Website by
                    any third party;
                  </li>
                  <li>
                    Any errors or omissions in any content or for any loss or damage incurred as a result of the use of
                    any content posted, emailed, transmitted, or otherwise made available through our Website.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">10. Governing Law</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of Egypt.
                  Any disputes arising under these Terms and Conditions shall be subject to the exclusive jurisdiction
                  of the courts of Egypt.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">11. Changes to Terms and Conditions</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                  immediately upon posting on our Website. Your continued use of our Website following the posting of
                  changes constitutes your acceptance of such changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">12. Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                <address className="not-italic mt-2">
                  Sika Egypt for Construction Chemicals S.A.E.
                  <br />
                  123 Construction Road, Industrial Area
                  <br />
                  Cairo, Egypt 12345
                  <br />
                  Email: legal@sika-egypt.com
                  <br />
                  Phone: +20 2 1234 5678
                </address>
              </section>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p>
            By using our website, you acknowledge that you have read and understood these Terms and Conditions and agree
            to be bound by them.
          </p>
        </div>

        <div className="text-center">
          <Link href="/privacy" className="text-red-600 hover:underline">
            View our Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
