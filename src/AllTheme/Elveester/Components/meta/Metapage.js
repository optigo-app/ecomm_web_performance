import { useLocation } from "react-router-dom";
import MetaData from "./MetaData";

const URL_ADDRESS = "https://www.elvee.in";

const metaData = {
    "/LoginOption": {
        title: 'Login | Elvee',
        description: 'Log in or sign up to Elvee using email or mobile.',
        canonical: `${URL_ADDRESS}/LoginOption`,
        keywords: 'Elvee login, sign in, register, email login, mobile login'
    },
    "/ContinueWithEmail": {
        title: 'Continue with Email | Elvee',
        description: 'Continue your login with email on Elvee.',
        canonical: `${URL_ADDRESS}/ContinueWithEmail`,
        keywords: 'email login, continue login, Elvee login, sign in'
    },
    "/ContinueWithMobile": {
        title: 'Continue with Mobile | Elvee',
        description: 'Continue your login with mobile on Elvee.',
        canonical: `${URL_ADDRESS}/ContinueWithMobile`,
        keywords: 'mobile login, Elvee mobile sign in, OTP login'
    },
    "/LoginWithEmail": {
        title: 'Login with Email | Elvee',
        description: 'Log in to Elvee using your email address.',
        canonical: `${URL_ADDRESS}/LoginWithEmail`,
        keywords: 'email login, Elvee sign in, secure login'
    },
    "/LoginWithEmailCode": {
        title: 'Login with Email Code | Elvee',
        description: 'Enter the code sent to your email to log in.',
        canonical: `${URL_ADDRESS}/LoginWithEmailCode`,
        keywords: 'email code login, OTP login, verify code'
    },
    "/LoginWithMobileCode": {
        title: 'Login with Mobile Code | Elvee',
        description: 'Enter the code sent to your mobile to log in.',
        canonical: `${URL_ADDRESS}/LoginWithMobileCode`,
        keywords: 'mobile code login, OTP verification, SMS login'
    },
    "/ForgotPass": {
        title: 'Forgot Password | Elvee',
        description: 'Reset your Elvee password using your email or mobile.',
        canonical: `${URL_ADDRESS}/ForgotPass`,
        keywords: 'forgot password, reset password, Elvee account recovery'
    },
    "/cartPage": {
        title: 'Cart | Elvee',
        description: 'Your shopping cart on Elvee.',
        canonical: `${URL_ADDRESS}/cartPage`,
        keywords: 'shopping cart, Elvee cart, checkout'
    },
    "/myWishList": {
        title: 'Wishlist | Elvee',
        description: 'Your wishlist on Elvee.',
        canonical: `${URL_ADDRESS}/myWishList`,
        keywords: 'wishlist, favorite items, saved products'
    },
    "/Delivery": {
        title: 'Delivery | Elvee',
        description: 'Your delivery details on Elvee.',
        canonical: `${URL_ADDRESS}/Delivery`,
        keywords: 'delivery info, shipping, Elvee order delivery'
    },
    "/payment": {
        title: 'Payment | Elvee',
        description: 'Your payment details on Elvee.',
        canonical: `${URL_ADDRESS}/payment`,
        keywords: 'Elvee payment, checkout, secure payment'
    },
    "/Confirmation": {
        title: 'Confirmation | Elvee',
        description: 'Your order confirmation on Elvee.',
        canonical: `${URL_ADDRESS}/Confirmation`,
        keywords: 'order confirmation, Elvee order, purchase complete'
    },
    "/p/*": {
        title: 'Product List | Elvee',
        description: 'Browse our collection of products on Elvee.',
        canonical: `${URL_ADDRESS}/p`,
        keywords: 'product list, shop, Elvee products, categories'
    },
    "/d/*": {
        title: 'Product Detail | Elvee',
        description: 'View detailed information about a product on Elvee.',
        canonical: `${URL_ADDRESS}/d`,
        keywords: 'product detail, Elvee item, product information'
    },
    "/Lookbook": {
        title: 'Lookbook | Elvee',
        description: 'Explore the latest lookbook from Elvee.',
        canonical: `${URL_ADDRESS}/Lookbook`,
        keywords: 'lookbook, Elvee style, fashion guide'
    },
    "/account": {
        title: 'Account | Elvee',
        description: 'Your account details on Elvee.',
        canonical: `${URL_ADDRESS}/account`,
        keywords: 'account settings, profile, Elvee user info'
    },
    "/aboutUs": {
        title: 'About Us | Elvee',
        description: 'Learn more about Elvee, our mission, and our team.',
        canonical: `${URL_ADDRESS}/aboutUs`,
        keywords: 'about Elvee, company info, team, mission, About Us'
    },
    "/history": {
        title: 'History | Elvee',
        description: 'Explore the history and milestones of Elvee.',
        canonical: `${URL_ADDRESS}/history`,
        keywords: 'Elvee history, milestones, brand journey, History'
    },
    "/term&condition": {
        title: 'Terms and Conditions | Elvee',
        description: 'Read our terms and conditions to use Elvee.',
        canonical: `${URL_ADDRESS}/term&condition`,
        keywords: 'terms, conditions, user agreement, policies, Terms and Conditions'
    },
    "/customerServices": {
        title: 'Customer Services | Elvee',
        description: 'Contact our customer support for help and inquiries.',
        canonical: `${URL_ADDRESS}/customerServices`,
        keywords: 'customer support, help, Elvee service, Customer Services'
    },
    "/customize": {
        title: 'Customize | Elvee',
        description: 'Customize your Elvee experience with personalization.',
        canonical: `${URL_ADDRESS}/customize`,
        keywords: 'customize Elvee, personalization, user settings, Customize'
    },
    "/privacy": {
        title: 'Privacy Policy | Elvee',
        description: 'Understand how Elvee handles your data.',
        canonical: `${URL_ADDRESS}/privacy`,
        keywords: 'privacy policy, data handling, security, GDPR, Privacy Policy'
    },
    "/contact-us": {
        title: 'Contact Us | Elvee',
        description: 'Get in touch with Elvee for any queries or feedback.',
        canonical: `${URL_ADDRESS}/contact-us`,
        keywords: 'contact Elvee, customer support, inquiries, Contact Us'
    },
    "/careers": {
        title: 'Careers | Elvee',
        description: 'Explore job opportunities at Elvee.',
        canonical: `${URL_ADDRESS}/careers`,
        keywords: 'Elvee careers, job openings, work with us, Careers',
    },
    "/appointment": {
        title: 'Appointment | Elvee',
        description: 'Schedule an appointment with Elvee.',
        canonical: `${URL_ADDRESS}/appointment`,
        keywords: 'appointment, schedule, book a visit, Appointment'
    },
    "/faqs": {
        title: 'FAQs | Elvee',
        description: 'Frequently asked questions about Elvee.',
        canonical: `${URL_ADDRESS}/faqs`,
        keywords: 'FAQs, help, common questions, support,FAQs'
    }
};

const defaultMetadata = {
    title: 'Elvee Jewels Private Limited - Elegant Gold & Silver Jewelry Collections',
    description: 'Elvee Jewels is a prestigious bridal jewelry brand crafting timeless pieces that celebrate romance, elegance, and cultural heritage with sophistication.',
    canonical: URL_ADDRESS,
    keywords: 'Elvee, elvee ,bridal jewelry, elegant jewelry, fashion jewelry, Elvee jewels, ELvee Jewels Private limited, elveester, Elveester',
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


