import { useLocation } from "react-router-dom";
import MetaData from "./MetaData";

const URL_ADDRESS = "https://sonasons.optigoapps.com";

const metaData = {
    "/LoginOption": {
        title: "Login | Sonasons",
        description: "Log in or sign up to Sonasons Jewelry for exclusive access to gold and diamond collections. Use your email or mobile for easy login.",
        canonical: `${URL_ADDRESS}/LoginOption`,
        keywords: "Sonasons login, jewelry account login, gold and diamond login, email login, mobile login"
    },
    "/ContinueWithEmail": {
        title: "Continue with Email | Sonasons",
        description: "Continue your login with email and access the best gold and diamond jewelry collections at Sonasons. Exclusive offers await.",
        canonical: `${URL_ADDRESS}/ContinueWithEmail`,
        keywords: "email login, Sonasons email login, jewelry account login, continue with email"
    },
    "/ContinueWithMobile": {
        title: "Continue with Mobile | Sonasons",
        description: "Log in to Sonasons Jewelry using your mobile and explore our exquisite gold and diamond jewelry designs. Secure login with OTP.",
        canonical: `${URL_ADDRESS}/ContinueWithMobile`,
        keywords: "mobile login, Sonasons mobile login, OTP login, jewelry login"
    },
    "/LoginWithEmail": {
        title: "Sign In with Email | Sonasons",
        description: "Log in securely to Sonasons Jewelry using your email. Access the finest gold and diamond jewelry collections online.",
        canonical: `${URL_ADDRESS}/LoginWithEmail`,
        keywords: "email login, secure login, Sonasons jewelry sign in, diamond jewelry account login"
    },
    "/LoginWithEmailCode": {
        title: "Sign In with Email Code | Sonasons",
        description: "Enter the code sent to your email to sign in securely to Sonasons Jewelry and access exclusive offers on gold and diamond jewelry.",
        canonical: `${URL_ADDRESS}/LoginWithEmailCode`,
        keywords: "email code login, OTP login, verify email code, jewelry account security"
    },
    "/LoginWithMobileCode": {
        title: "Sign In with Mobile Code | Sonasons",
        description: "Enter the code sent to your mobile to securely log in to Sonasons Jewelry. Explore our premium gold and diamond collections.",
        canonical: `${URL_ADDRESS}/LoginWithMobileCode`,
        keywords: "mobile code login, OTP verification, Sonasons jewelry mobile login, SMS login"
    },
    "/register": {
        title: "Sign Up | Sonasons – Create Your Account",
        description: "Create your Sonasons Jewelry account to unlock exclusive access to the finest gold, diamond rings, necklaces, and more. Sign up now!",
        canonical: `${URL_ADDRESS}/register`,
        keywords: "Sonasons sign up, jewelry account registration, gold and diamond sign up, jewelry store login"
    },
    "/ForgotPass": {
        title: "Forgot Password | Sonasons",
        description: "Reset your Sonasons Jewelry password securely via email or mobile. Gain access to premium gold and diamond jewelry collections.",
        canonical: `${URL_ADDRESS}/ForgotPass`,
        keywords: "forgot password, reset password, Sonasons account recovery, jewelry account reset"
    },
    "/cartPage": {
        title: "Cart | Sonasons – Your Shopping Cart",
        description: "Review your selected gold, diamond, and jewelry pieces in the cart. Proceed to checkout to complete your Sonasons Jewelry purchase.",
        canonical: `${URL_ADDRESS}/cartPage`,
        keywords: "shopping cart, Sonasons cart, jewelry checkout, gold and diamond cart"
    },
    "/myWishList": {
        title: "Wishlist | Sonasons – Your Favorite Pieces",
        description: "Save your favorite jewelry items to your Sonasons Wishlist and revisit them whenever you want. From rings to necklaces, keep track of your desires.",
        canonical: `${URL_ADDRESS}/myWishList`,
        keywords: "wishlist, favorite jewelry, saved products, Sonasons wishlist"
    },
    "/Delivery": {
        title: "Delivery | Sonasons – Shipping Information",
        description: "Track and manage your delivery details for your Sonasons Jewelry order. Get the best shipping options for your gold and diamond purchases.",
        canonical: `${URL_ADDRESS}/Delivery`,
        keywords: "delivery details, shipping Sonasons, jewelry delivery, Elvee order delivery"
    },
    "/Payment": {
        title: "Payment | Sonasons – Secure Payment Options",
        description: "Choose from multiple secure payment methods at Sonasons Jewelry. Complete your gold and diamond jewelry purchase with confidence.",
        canonical: `${URL_ADDRESS}/payment`,
        keywords: "secure payment, jewelry checkout, Sonasons payment, gold payment options"
    },
    "/Confirmation": {
        title: "Order Confirmation | Sonasons – Your Purchase is Complete",
        description: "Your order confirmation for Sonasons Jewelry. Thank you for purchasing premium gold and diamond jewelry. We’ll handle the rest!",
        canonical: `${URL_ADDRESS}/Confirmation`,
        keywords: "order confirmation, Sonasons purchase, jewelry order complete"
    },
    "/p/*": {
        title: "Product List | Sonasons – Shop Our Exclusive Collection",
        description: "Browse through Sonasons' collection of luxury gold and diamond jewelry. Find the perfect piece for you from our premium selection.",
        canonical: `${URL_ADDRESS}/p`,
        keywords: "product list, jewelry collection, Sonasons products, gold and diamond jewelry"
    },
    "/d/*": {
        title: "Product Detail | Sonasons – Explore Our Unique Designs",
        description: "View detailed information about each Sonasons Jewelry product, including materials, craftsmanship, and pricing for gold, diamond, and more.",
        canonical: `${URL_ADDRESS}/d`,
        keywords: "product details, Sonasons jewelry, diamond rings, gold necklaces"
    },
    "/Lookbook": {
        title: "Lookbook | Sonasons – Explore Our Latest Styles",
        description: "Discover the latest jewelry trends in our Lookbook. From diamond rings to gold necklaces, explore curated styles at Sonasons Jewelry.",
        canonical: `${URL_ADDRESS}/Lookbook`,
        keywords: "lookbook, jewelry styles, Sonasons fashion, gold and diamond looks"
    },
    "/account": {
        title: "Account | Sonasons – Manage Your Profile",
        description: "Manage your account settings, personal information, and preferences on Sonasons Jewelry. Stay updated on the latest offers and jewelry collections.",
        canonical: `${URL_ADDRESS}/account`,
        keywords: "account settings, profile, jewelry account, Sonasons user info"
    },
    "/aboutUs": {
        title: "About Us | Sonasons – Our Story and Mission",
        description: "Learn about Sonasons, our journey, and the team behind our exquisite gold and diamond jewelry. Discover our commitment to quality.",
        canonical: `${URL_ADDRESS}/aboutUs`,
        keywords: "about Sonasons, jewelry mission, company info, Sonasons team"
    },
    "/ContactUs": {
        title: "Contact Us | Sonasons – Get in Touch",
        description: "Have questions? Get in touch with the Sonasons team for customer support or inquiries. We’re here to help you with all your jewelry needs.",
        canonical: `${URL_ADDRESS}/contact-us`,
        keywords: "contact Sonasons, jewelry support, customer inquiries, Elvee contact"
    },
    "/servicePolicy": {
        title: "Service Policy | Sonasons – Terms of Service",
        description: "Read Sonasons's service policy, including our commitment to quality, customer care, and product satisfaction.",
        canonical: `${URL_ADDRESS}/servicePolicy`,
        keywords: "service policy, jewelry terms, Sonasons service, customer care"
    },
    "/ExpertAdvice": {
        title: "Expert Advice | Sonasons – Jewelry Buying Guide",
        description: "Get expert advice on buying gold, diamond, and luxury jewelry from Sonasons. Learn how to choose the perfect piece for every occasion.",
        canonical: `${URL_ADDRESS}/ExpertAdvice`,
        keywords: "expert advice, jewelry guide, buying diamonds, gold jewelry tips"
    },
    "/bespoke-jewelry": {
        title: "Bespoke Jewelry | Sonasons – Custom Designs",
        description: "Create your dream jewelry piece with Sonasons. Our bespoke service allows you to design your own custom gold and diamond jewelry.",
        canonical: `${URL_ADDRESS}/bespoke-jewelry`,
        keywords: "bespoke jewelry, custom jewelry, design your jewelry, personalized rings"
    },
    "/terms-and-conditions": {
        title: "Terms and Conditions | Sonasons – User Agreement",
        description: "Read Sonasons's terms and conditions for using our website and services. Understand our policies before making a purchase.",
        canonical: `${URL_ADDRESS}/terms-and-conditions`,
        keywords: "terms and conditions, user agreement, jewelry policies, Sonasons terms"
    },
    "/customerServices": {
        title: "Customer Services | Sonasons – We’re Here to Help",
        description: "Reach out to Sonasons Jewelry customer support for any help, inquiries, or issues with your jewelry orders. We’re dedicated to assisting you.",
        canonical: `${URL_ADDRESS}/customerServices`,
        keywords: "customer service, jewelry support, Elvee customer help, Sonasons inquiries"
    },
    "/privacyPolicy": {
        title: "Privacy Policy | Sonasons – How We Protect Your Data",
        description: "Learn how Sonasons Jewelry handles your personal information, protecting your privacy and ensuring secure transactions.",
        canonical: `${URL_ADDRESS}/privacyPolicy`,
        keywords: "privacy policy, data security, jewelry privacy, GDPR, Sonasons privacy"
    },
    "/FunFact": {
        title: "Fun Facts | Sonasons – Fascinating Jewelry Insights",
        description: "Discover fun facts about jewelry, diamonds, and gold. Learn more about the history and secrets behind Sonasons Jewelry’s creations.",
        canonical: `${URL_ADDRESS}/FunFact`,
        keywords: "jewelry facts, fun jewelry trivia, Sonasons facts, gold and diamond fun facts"
    },
    "/TermsPolicy": {
        title: "Terms Policy | Sonasons – Terms and Conditions",
        description: "Read Sonasons Jewelry's terms policy and how they apply to your use of the site and purchases. Stay informed about our terms.",
        canonical: `${URL_ADDRESS}/TermsPolicy`,
        keywords: "terms policy, Sonasons terms, user agreement, jewelry site terms"
    },
    "/natural-diamond": {
        title: "Natural Diamonds | Sonasons – The Ultimate Sparkle",
        description: "Explore Sonasons' collection of natural diamonds, handpicked for their brilliance and quality. Perfect for engagement rings, necklaces, and more.",
        canonical: `${URL_ADDRESS}/natural-diamond`,
        keywords: "natural diamonds, diamond jewelry, engagement diamonds, Sonasons diamonds"
    },
    "/careers": {
        title: "Careers | Sonasons – Join Our Team",
        description: "Explore exciting job opportunities at Sonasons Jewelry. If you're passionate about luxury jewelry, we'd love to have you on our team.",
        canonical: `${URL_ADDRESS}/careers`,
        keywords: "careers at Sonasons, jewelry job openings, work with Sonasons, join Sonasons"
    },
    "/appointment": {
        title: "Appointment | Sonasons – Book a Consultation",
        description: "Schedule an appointment with Sonasons Jewelry to discuss custom designs, purchase queries, or to explore our latest collections.",
        canonical: `${URL_ADDRESS}/appointment`,
        keywords: "appointment, jewelry consultation, schedule appointment, book visit"
    },
};

const defaultMetadata = {
    title: 'Sonasons - Best Store for Online Jewellery Shopping',
    description: 'Sonasons offers the best gold & diamond jewellery designs online. Check out our latest collection of rings, earrings, bangles, bracelets, necklaces at best price in India.',
    canonical: URL_ADDRESS,
    keywords: 'Sonasons, online jewellery shopping, gold jewellery, diamond jewellery, rings, earrings, bangles, bracelets, necklaces, jewellery India',
};

const MetaPage = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const matchedKey = Object.keys(metaData).find((key) => {
        if (key.includes('*')) {
            const pattern = new RegExp('^' + key.replace('*', '.*') + '$');
            return pattern.test(currentPath);
        }
        return currentPath === key;
    });

    const pageMetadata = matchedKey ? metaData[matchedKey] : defaultMetadata;

    return (
        <MetaData
            title={pageMetadata.title}
            description={pageMetadata.description}
            canonical={pageMetadata.canonical}
            keywords={pageMetadata.keywords}
        />
    );
};

export default MetaPage;


