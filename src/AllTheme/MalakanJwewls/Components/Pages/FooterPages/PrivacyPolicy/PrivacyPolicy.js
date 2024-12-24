import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PrivacyPolicy.scss'

const privacyData = {
    introduction: {
        text: "At Sonasons, your privacy and trust are our highest priorities. We are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, store, and protect your personal data when you visit our website, make a purchase, or engage with us in any other way."
    },
    sections: [
        {
            title: "Information We Collect",
            content: [
                {
                    subtitle: "Personal Identification Information:",
                    text: "We may collect personal information such as your name, email address, phone number, billing address, and shipping address when you place an order or contact us for customer service."
                },
                {
                    subtitle: "Usage Data:",
                    text: "We may collect data about how you use our website, including information such as your IP address, browser type, pages viewed, and time spent on the site."
                },
                {
                    subtitle: "Cookies and Tracking Technologies:",
                    text: "We use cookies to enhance your browsing experience and analyze trends. Cookies help us remember your preferences and track your activity on the website."
                }
            ]
        },
        {
            title: "How We Use Your Information",
            content: [
                {
                    subtitle: "Order Processing:",
                    text: "We use the personal data we collect to process your orders, complete transactions, and deliver products to you."
                },
                {
                    subtitle: "Customer Service:",
                    text: "Your information helps us respond to inquiries, resolve issues, and provide you with support regarding your orders and products."
                },
                {
                    subtitle: "Marketing Communications:",
                    text: "We may send promotional emails about new products, offers, or events with your consent. You can opt-out of marketing emails at any time."
                },
                {
                    subtitle: "Website Improvement:",
                    text: "We analyze your usage data to enhance our website, improve customer experience, and personalize your shopping experience."
                }
            ]
        },
        {
            title: "Data Protection and Security",
            content: [
                {
                    subtitle: "How We Protect Your Data:",
                    text: "We implement various security measures to protect your personal data from unauthorized access, misuse, or loss. All sensitive information is transmitted via secure SSL encryption."
                },
                {
                    subtitle: "Data Sharing:",
                    text: "We do not share your personal information with third parties for marketing purposes. However, we may share your data with trusted service providers who assist in processing payments, fulfilling orders, and sending emails."
                }
            ]
        },
        {
            title: "Your Rights",
            content: [
                {
                    subtitle: "Access and Correction:",
                    text: "You can request access to your personal data and correct any inaccuracies in the information we hold."
                },
                {
                    subtitle: "Opt-out of Marketing Communications:",
                    text: "You may choose to unsubscribe from our promotional emails at any time by clicking the 'unsubscribe' link in the email."
                },
                {
                    subtitle: "Data Deletion:",
                    text: "You have the right to request the deletion of your personal data, subject to legal requirements and contractual obligations."
                }
            ]
        },
        {
            title: "Cookies and Tracking Technologies",
            content: [
                {
                    subtitle: "Cookies:",
                    text: "We use cookies to enhance your experience, track activity, and analyze trends. You can control cookies through your browser settings, but disabling them may affect some site features."
                },
                {
                    subtitle: "Other Tracking Technologies:",
                    text: "In addition to cookies, we may use web beacons, pixels, or similar technologies to collect data on your interactions with our site."
                }
            ]
        },
        {
            title: "Changes to This Privacy Policy",
            content: [
                {
                    subtitle: "Policy Updates:",
                    text: "We reserve the right to update this Privacy Policy. Any changes will be posted on this page, and the 'Effective Date' will be updated accordingly."
                },
                {
                    subtitle: "Continued Use:",
                    text: "By continuing to use our website after changes to this policy, you consent to the updated terms."
                }
            ]
        }
    ],
    conclusion: {
        text: "At Sonasons, we value your privacy and are dedicated to ensuring that your personal information is handled with care. If you have any questions or concerns about this Privacy Policy, please don't hesitate to reach out to us."
    }
};

const LoremData = {
    introduction: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula velit sit amet eros volutpat, id feugiat risus facilisis. Nam consequat, ipsum a dapibus volutpat, metus risus feugiat purus, sed accumsan dui felis vel justo. Nullam tincidunt augue a neque laoreet, sed varius odio placerat. Sed sollicitudin, felis eget lacinia tincidunt, ipsum leo laoreet odio, at dictum elit dui ac velit."
    },
    sections: [
        {
            title: "Information We Collect",
            content: [
                {
                    subtitle: "Personal Identification Information:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet ultricies sem. Integer tincidunt augue ac velit luctus, id bibendum enim ultricies. Donec vehicula ante euismod ipsum laoreet, euismod elementum odio aliquam."
                },
                {
                    subtitle: "Usage Data:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt justo a ligula mollis, ac vestibulum nulla volutpat. Etiam interdum, magna eu malesuada malesuada, orci orci volutpat risus, ut convallis arcu leo in urna."
                },
                {
                    subtitle: "Cookies and Tracking Technologies:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut felis quam. Suspendisse vel purus ultricies, tincidunt neque sed, tempor turpis. Fusce molestie ipsum ut ex scelerisque, at tincidunt mi facilisis."
                }
            ]
        },
        {
            title: "How We Use Your Information",
            content: [
                {
                    subtitle: "Order Processing:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor suscipit ipsum, in vehicula odio lacinia vel. Nulla facilisi. Phasellus tempor sapien id urna auctor, ac maximus risus rutrum."
                },
                {
                    subtitle: "Customer Service:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum purus sit amet tortor fermentum, ac pretium augue volutpat. Morbi vitae sapien leo. Mauris sit amet dui vel leo gravida auctor."
                },
                {
                    subtitle: "Marketing Communications:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nunc vehicula, hendrerit ligula sed, cursus odio. In non felis ut purus tincidunt efficitur. Ut euismod neque id urna pharetra."
                },
                {
                    subtitle: "Website Improvement:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Mauris ultricies urna at libero tincidunt, ac fermentum augue tempus. Proin at libero a metus elementum malesuada."
                }
            ]
        },
        {
            title: "Data Protection and Security",
            content: [
                {
                    subtitle: "How We Protect Your Data:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada eros et velit posuere, a interdum enim malesuada. Vivamus non sollicitudin nulla, eget viverra eros. Nulla venenatis mauris velit, eget tincidunt urna condimentum ac."
                },
                {
                    subtitle: "Data Sharing:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac velit metus. Sed auctor orci id neque fringilla, non interdum elit venenatis. Aliquam erat volutpat. Cras viverra ut nisi ac egestas."
                }
            ]
        },
        {
            title: "Your Rights",
            content: [
                {
                    subtitle: "Access and Correction:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac dui vel felis euismod dapibus. Etiam faucibus metus ac lorem pharetra maximus. Fusce in purus hendrerit, hendrerit ipsum sed, sollicitudin ligula."
                },
                {
                    subtitle: "Opt-out of Marketing Communications:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in dolor sit amet arcu convallis ullamcorper. Ut placerat lectus et enim euismod, eget iaculis elit tempor. Cras ut nunc eu turpis posuere vehicula."
                },
                {
                    subtitle: "Data Deletion:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a tincidunt magna. Suspendisse potenti. Curabitur tempus neque ut nibh consectetur, in varius lorem volutpat. Nulla facilisi. Integer convallis nisl at ex lobortis, sit amet euismod neque condimentum."
                }
            ]
        },
        {
            title: "Cookies and Tracking Technologies",
            content: [
                {
                    subtitle: "Cookies:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec risus nisl. Aenean condimentum, odio ac fermentum volutpat, mauris tortor gravida sapien, eget suscipit lectus justo ut orci."
                },
                {
                    subtitle: "Other Tracking Technologies:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor, turpis ac sollicitudin varius, metus augue vestibulum dolor, at elementum dui neque vel ante. Nulla egestas mollis malesuada."
                }
            ]
        },
        {
            title: "Changes to This Privacy Policy",
            content: [
                {
                    subtitle: "Policy Updates:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget orci eu ante maximus auctor et vitae ipsum. Sed vel fermentum arcu. Sed eu ex gravida, viverra nunc eget, mollis lorem."
                },
                {
                    subtitle: "Continued Use:",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum sem nec libero ullamcorper, in sodales dui pharetra. Morbi euismod dolor sit amet ex vehicula, nec scelerisque velit venenatis."
                }
            ]
        }
    ],
    conclusion: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec purus at velit laoreet ullamcorper. Sed suscipit, nulla vitae cursus ullamcorper, augue tortor maximus purus, sit amet venenatis metus erat eu purus."
    }
};



export default function PrivacyPolicy() {
    return (
        <div className="sonasons-terms">
            <Banner />
            <main className="sonasons-main">
                <h1 className="sonasons-title">Privacy Policy</h1>

                <div className="sonasons-content">
                    <p className="sonasons-introduction">{LoremData.introduction.text}</p>

                    {LoremData.sections.map((section, index) => (
                        <section key={index} className="sonasons-section">
                            <h2 className="sonasons-section-title">{section.title}</h2>
                            {section.content.map((item, itemIndex) => (
                                <div key={itemIndex} className="sonasons-section-content">
                                    <h3 className="sonasons-subtitle">{item.subtitle}</h3>
                                    <p className="sonasons-text">{item.text}</p>
                                </div>
                            ))}
                        </section>
                    ))}

                    <p className="sonasons-conclusion">{LoremData.conclusion.text}</p>
                </div>
            </main>
        </div>
    )
}


const Banner = ({ title = "Privacy Policy" }) => {
    const Image = `url(${storImagePath() + "/images/HomePage/PrivacyPolicy/Banner.png"
        })`;
    return (
        <>
            <div
                className="sonasons-banner"
                style={{
                    backgroundImage: Image,
                }}
            >
                {/* <h1 style={{color: "black"}}>{title}</h1> */}
            </div>
        </>
    );
};