import React, { useEffect, useState } from 'react';
import './Contact.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import { BespokeAPI } from '../../../../../../../utils/API/Bespoke/BespokeAPI';
import { toast } from 'react-toastify';

// const CountryCode = [
//     {
//         "name": "Afghanistan",
//         "code": "AF"
//     },
//     {
//         "name": "Albania",
//         "code": "AL"
//     },
//     {
//         "name": "Algeria",
//         "code": "DZ"
//     },
//     {
//         "name": "American Samoa",
//         "code": "AS"
//     },
//     {
//         "name": "Andorra",
//         "code": "AD"
//     },
//     {
//         "name": "Angola",
//         "code": "AO"
//     },
//     {
//         "name": "Anguilla",
//         "code": "AI"
//     },
//     {
//         "name": "Antarctica",
//         "code": "AQ"
//     },
//     {
//         "name": "Antigua and Barbuda",
//         "code": "AG"
//     },
//     {
//         "name": "Argentina",
//         "code": "AR"
//     },
//     {
//         "name": "Armenia",
//         "code": "AM"
//     },
//     {
//         "name": "Aruba",
//         "code": "AW"
//     },
//     {
//         "name": "Asia/Pacific Region",
//         "code": "AP"
//     },
//     {
//         "name": "Australia",
//         "code": "AU"
//     },
//     {
//         "name": "Austria",
//         "code": "AT"
//     },
//     {
//         "name": "Azerbaijan",
//         "code": "AZ"
//     },
//     {
//         "name": "Bahamas",
//         "code": "BS"
//     },
//     {
//         "name": "Bahrain",
//         "code": "BH"
//     },
//     {
//         "name": "Bangladesh",
//         "code": "BD"
//     },
//     {
//         "name": "Barbados",
//         "code": "BB"
//     },
//     {
//         "name": "Belarus",
//         "code": "BY"
//     },
//     {
//         "name": "Belgium",
//         "code": "BE"
//     },
//     {
//         "name": "Belize",
//         "code": "BZ"
//     },
//     {
//         "name": "Benin",
//         "code": "BJ"
//     },
//     {
//         "name": "Bermuda",
//         "code": "BM"
//     },
//     {
//         "name": "Bhutan",
//         "code": "BT"
//     },
//     {
//         "name": "Bolivia",
//         "code": "BO"
//     },
//     {
//         "name": "Bonaire, Sint Eustatius and Saba",
//         "code": "BQ"
//     },
//     {
//         "name": "Bosnia and Herzegovina",
//         "code": "BA"
//     },
//     {
//         "name": "Botswana",
//         "code": "BW"
//     },
//     {
//         "name": "Bouvet Island",
//         "code": "BV"
//     },
//     {
//         "name": "Brazil",
//         "code": "BR"
//     },
//     {
//         "name": "British Indian Ocean Territory",
//         "code": "IO"
//     },
//     {
//         "name": "Brunei Darussalam",
//         "code": "BN"
//     },
//     {
//         "name": "Bulgaria",
//         "code": "BG"
//     },
//     {
//         "name": "Burkina Faso",
//         "code": "BF"
//     },
//     {
//         "name": "Burundi",
//         "code": "BI"
//     },
//     {
//         "name": "Cambodia",
//         "code": "KH"
//     },
//     {
//         "name": "Cameroon",
//         "code": "CM"
//     },
//     {
//         "name": "Canada",
//         "code": "CA"
//     },
//     {
//         "name": "Cape Verde",
//         "code": "CV"
//     },
//     {
//         "name": "Cayman Islands",
//         "code": "KY"
//     },
//     {
//         "name": "Central African Republic",
//         "code": "CF"
//     },
//     {
//         "name": "Chad",
//         "code": "TD"
//     },
//     {
//         "name": "Chile",
//         "code": "CL"
//     },
//     {
//         "name": "China",
//         "code": "CN"
//     },
//     {
//         "name": "Christmas Island",
//         "code": "CX"
//     },
//     {
//         "name": "Cocos (Keeling) Islands",
//         "code": "CC"
//     },
//     {
//         "name": "Colombia",
//         "code": "CO"
//     },
//     {
//         "name": "Comoros",
//         "code": "KM"
//     },
//     {
//         "name": "Congo",
//         "code": "CG"
//     },
//     {
//         "name": "Congo, The Democratic Republic of the",
//         "code": "CD"
//     },
//     {
//         "name": "Cook Islands",
//         "code": "CK"
//     },
//     {
//         "name": "Costa Rica",
//         "code": "CR"
//     },
//     {
//         "name": "Croatia",
//         "code": "HR"
//     },
//     {
//         "name": "Cuba",
//         "code": "CU"
//     },
//     {
//         "name": "Curaçao",
//         "code": "CW"
//     },
//     {
//         "name": "Cyprus",
//         "code": "CY"
//     },
//     {
//         "name": "Czech Republic",
//         "code": "CZ"
//     },
//     {
//         "name": "Côte d'Ivoire",
//         "code": "CI"
//     },
//     {
//         "name": "Denmark",
//         "code": "DK"
//     },
//     {
//         "name": "Djibouti",
//         "code": "DJ"
//     },
//     {
//         "name": "Dominica",
//         "code": "DM"
//     },
//     {
//         "name": "Dominican Republic",
//         "code": "DO"
//     },
//     {
//         "name": "Ecuador",
//         "code": "EC"
//     },
//     {
//         "name": "Egypt",
//         "code": "EG"
//     },
//     {
//         "name": "El Salvador",
//         "code": "SV"
//     },
//     {
//         "name": "Equatorial Guinea",
//         "code": "GQ"
//     },
//     {
//         "name": "Eritrea",
//         "code": "ER"
//     },
//     {
//         "name": "Estonia",
//         "code": "EE"
//     },
//     {
//         "name": "Ethiopia",
//         "code": "ET"
//     },
//     {
//         "name": "Falkland Islands (Malvinas)",
//         "code": "FK"
//     },
//     {
//         "name": "Faroe Islands",
//         "code": "FO"
//     },
//     {
//         "name": "Fiji",
//         "code": "FJ"
//     },
//     {
//         "name": "Finland",
//         "code": "FI"
//     },
//     {
//         "name": "France",
//         "code": "FR"
//     },
//     {
//         "name": "French Guiana",
//         "code": "GF"
//     },
//     {
//         "name": "French Polynesia",
//         "code": "PF"
//     },
//     {
//         "name": "French Southern Territories",
//         "code": "TF"
//     },
//     {
//         "name": "Gabon",
//         "code": "GA"
//     },
//     {
//         "name": "Gambia",
//         "code": "GM"
//     },
//     {
//         "name": "Georgia",
//         "code": "GE"
//     },
//     {
//         "name": "Germany",
//         "code": "DE"
//     },
//     {
//         "name": "Ghana",
//         "code": "GH"
//     },
//     {
//         "name": "Gibraltar",
//         "code": "GI"
//     },
//     {
//         "name": "Greece",
//         "code": "GR"
//     },
//     {
//         "name": "Greenland",
//         "code": "GL"
//     },
//     {
//         "name": "Grenada",
//         "code": "GD"
//     },
//     {
//         "name": "Guadeloupe",
//         "code": "GP"
//     },
//     {
//         "name": "Guam",
//         "code": "GU"
//     },
//     {
//         "name": "Guatemala",
//         "code": "GT"
//     },
//     {
//         "name": "Guernsey",
//         "code": "GG"
//     },
//     {
//         "name": "Guinea",
//         "code": "GN"
//     },
//     {
//         "name": "Guinea-Bissau",
//         "code": "GW"
//     },
//     {
//         "name": "Guyana",
//         "code": "GY"
//     },
//     {
//         "name": "Haiti",
//         "code": "HT"
//     },
//     {
//         "name": "Heard Island and Mcdonald Islands",
//         "code": "HM"
//     },
//     {
//         "name": "Holy See (Vatican City State)",
//         "code": "VA"
//     },
//     {
//         "name": "Honduras",
//         "code": "HN"
//     },
//     {
//         "name": "Hong Kong",
//         "code": "HK"
//     },
//     {
//         "name": "Hungary",
//         "code": "HU"
//     },
//     {
//         "name": "Iceland",
//         "code": "IS"
//     },
//     {
//         "name": "India",
//         "code": "IN"
//     },
//     {
//         "name": "Indonesia",
//         "code": "ID"
//     },
//     {
//         "name": "Iran, Islamic Republic Of",
//         "code": "IR"
//     },
//     {
//         "name": "Iraq",
//         "code": "IQ"
//     },
//     {
//         "name": "Ireland",
//         "code": "IE"
//     },
//     {
//         "name": "Isle of Man",
//         "code": "IM"
//     },
//     {
//         "name": "Israel",
//         "code": "IL"
//     },
//     {
//         "name": "Italy",
//         "code": "IT"
//     },
//     {
//         "name": "Jamaica",
//         "code": "JM"
//     },
//     {
//         "name": "Japan",
//         "code": "JP"
//     },
//     {
//         "name": "Jersey",
//         "code": "JE"
//     },
//     {
//         "name": "Jordan",
//         "code": "JO"
//     },
//     {
//         "name": "Kazakhstan",
//         "code": "KZ"
//     },
//     {
//         "name": "Kenya",
//         "code": "KE"
//     },
//     {
//         "name": "Kiribati",
//         "code": "KI"
//     },
//     {
//         "name": "Korea, Republic of",
//         "code": "KR"
//     },
//     {
//         "name": "Kuwait",
//         "code": "KW"
//     },
//     {
//         "name": "Kyrgyzstan",
//         "code": "KG"
//     },
//     {
//         "name": "Laos",
//         "code": "LA"
//     },
//     {
//         "name": "Latvia",
//         "code": "LV"
//     },
//     {
//         "name": "Lebanon",
//         "code": "LB"
//     },
//     {
//         "name": "Lesotho",
//         "code": "LS"
//     },
//     {
//         "name": "Liberia",
//         "code": "LR"
//     },
//     {
//         "name": "Libyan Arab Jamahiriya",
//         "code": "LY"
//     },
//     {
//         "name": "Liechtenstein",
//         "code": "LI"
//     },
//     {
//         "name": "Lithuania",
//         "code": "LT"
//     },
//     {
//         "name": "Luxembourg",
//         "code": "LU"
//     },
//     {
//         "name": "Macao",
//         "code": "MO"
//     },
//     {
//         "name": "Madagascar",
//         "code": "MG"
//     },
//     {
//         "name": "Malawi",
//         "code": "MW"
//     },
//     {
//         "name": "Malaysia",
//         "code": "MY"
//     },
//     {
//         "name": "Maldives",
//         "code": "MV"
//     },
//     {
//         "name": "Mali",
//         "code": "ML"
//     },
//     {
//         "name": "Malta",
//         "code": "MT"
//     },
//     {
//         "name": "Marshall Islands",
//         "code": "MH"
//     },
//     {
//         "name": "Martinique",
//         "code": "MQ"
//     },
//     {
//         "name": "Mauritania",
//         "code": "MR"
//     },
//     {
//         "name": "Mauritius",
//         "code": "MU"
//     },
//     {
//         "name": "Mayotte",
//         "code": "YT"
//     },
//     {
//         "name": "Mexico",
//         "code": "MX"
//     },
//     {
//         "name": "Micronesia, Federated States of",
//         "code": "FM"
//     },
//     {
//         "name": "Moldova, Republic of",
//         "code": "MD"
//     },
//     {
//         "name": "Monaco",
//         "code": "MC"
//     },
//     {
//         "name": "Mongolia",
//         "code": "MN"
//     },
//     {
//         "name": "Montenegro",
//         "code": "ME"
//     },
//     {
//         "name": "Montserrat",
//         "code": "MS"
//     },
//     {
//         "name": "Morocco",
//         "code": "MA"
//     },
//     {
//         "name": "Mozambique",
//         "code": "MZ"
//     },
//     {
//         "name": "Myanmar",
//         "code": "MM"
//     },
//     {
//         "name": "Namibia",
//         "code": "NA"
//     },
//     {
//         "name": "Nauru",
//         "code": "NR"
//     },
//     {
//         "name": "Nepal",
//         "code": "NP"
//     },
//     {
//         "name": "Netherlands",
//         "code": "NL"
//     },
//     {
//         "name": "Netherlands Antilles",
//         "code": "AN"
//     },
//     {
//         "name": "New Caledonia",
//         "code": "NC"
//     },
//     {
//         "name": "New Zealand",
//         "code": "NZ"
//     },
//     {
//         "name": "Nicaragua",
//         "code": "NI"
//     },
//     {
//         "name": "Niger",
//         "code": "NE"
//     },
//     {
//         "name": "Nigeria",
//         "code": "NG"
//     },
//     {
//         "name": "Niue",
//         "code": "NU"
//     },
//     {
//         "name": "Norfolk Island",
//         "code": "NF"
//     },
//     {
//         "name": "North Korea",
//         "code": "KP"
//     },
//     {
//         "name": "North Macedonia",
//         "code": "MK"
//     },
//     {
//         "name": "Northern Mariana Islands",
//         "code": "MP"
//     },
//     {
//         "name": "Norway",
//         "code": "NO"
//     },
//     {
//         "name": "Oman",
//         "code": "OM"
//     },
//     {
//         "name": "Pakistan",
//         "code": "PK"
//     },
//     {
//         "name": "Palau",
//         "code": "PW"
//     },
//     {
//         "name": "Palestinian Territory, Occupied",
//         "code": "PS"
//     },
//     {
//         "name": "Panama",
//         "code": "PA"
//     },
//     {
//         "name": "Papua New Guinea",
//         "code": "PG"
//     },
//     {
//         "name": "Paraguay",
//         "code": "PY"
//     },
//     {
//         "name": "Peru",
//         "code": "PE"
//     },
//     {
//         "name": "Philippines",
//         "code": "PH"
//     },
//     {
//         "name": "Pitcairn Islands",
//         "code": "PN"
//     },
//     {
//         "name": "Poland",
//         "code": "PL"
//     },
//     {
//         "name": "Portugal",
//         "code": "PT"
//     },
//     {
//         "name": "Puerto Rico",
//         "code": "PR"
//     },
//     {
//         "name": "Qatar",
//         "code": "QA"
//     },
//     {
//         "name": "Reunion",
//         "code": "RE"
//     },
//     {
//         "name": "Romania",
//         "code": "RO"
//     },
//     {
//         "name": "Russian Federation",
//         "code": "RU"
//     },
//     {
//         "name": "Rwanda",
//         "code": "RW"
//     },
//     {
//         "name": "Saint Barthélemy",
//         "code": "BL"
//     },
//     {
//         "name": "Saint Helena",
//         "code": "SH"
//     },
//     {
//         "name": "Saint Kitts and Nevis",
//         "code": "KN"
//     },
//     {
//         "name": "Saint Lucia",
//         "code": "LC"
//     },
//     {
//         "name": "Saint Martin",
//         "code": "MF"
//     },
//     {
//         "name": "Saint Martin",
//         "code": "MF"
//     },
//     {
//         "name": "Saint Pierre and Miquelon",
//         "code": "PM"
//     },
//     {
//         "name": "Saint Vincent and the Grenadines",
//         "code": "VC"
//     },
//     {
//         "name": "Samoa",
//         "code": "WS"
//     },
//     {
//         "name": "San Marino",
//         "code": "SM"
//     },
//     {
//         "name": "Sao Tome and Principe",
//         "code": "ST"
//     },
//     {
//         "name": "Saudi Arabia",
//         "code": "SA"
//     },
//     {
//         "name": "Senegal",
//         "code": "SN"
//     },
//     {
//         "name": "Serbia",
//         "code": "RS"
//     },
//     {
//         "name": "Serbia and Montenegro",
//         "code": "CS"
//     },
//     {
//         "name": "Seychelles",
//         "code": "SC"
//     },
//     {
//         "name": "Sierra Leone",
//         "code": "SL"
//     },
//     {
//         "name": "Singapore",
//         "code": "SG"
//     },
//     {
//         "name": "Sint Maarten",
//         "code": "SX"
//     },
//     {
//         "name": "Slovakia",
//         "code": "SK"
//     },
//     {
//         "name": "Slovenia",
//         "code": "SI"
//     },
//     {
//         "name": "Solomon Islands",
//         "code": "SB"
//     },
//     {
//         "name": "Somalia",
//         "code": "SO"
//     },
//     {
//         "name": "South Africa",
//         "code": "ZA"
//     },
//     {
//         "name": "South Georgia and the South Sandwich Islands",
//         "code": "GS"
//     },
//     {
//         "name": "South Sudan",
//         "code": "SS"
//     },
//     {
//         "name": "Spain",
//         "code": "ES"
//     },
//     {
//         "name": "Sri Lanka",
//         "code": "LK"
//     },
//     {
//         "name": "Sudan",
//         "code": "SD"
//     },
//     {
//         "name": "Suriname",
//         "code": "SR"
//     },
//     {
//         "name": "Svalbard and Jan Mayen",
//         "code": "SJ"
//     },
//     {
//         "name": "Swaziland",
//         "code": "SZ"
//     },
//     {
//         "name": "Sweden",
//         "code": "SE"
//     },
//     {
//         "name": "Switzerland",
//         "code": "CH"
//     },
//     {
//         "name": "Syrian Arab Republic",
//         "code": "SY"
//     },
//     {
//         "name": "Taiwan",
//         "code": "TW"
//     },
//     {
//         "name": "Tajikistan",
//         "code": "TJ"
//     },
//     {
//         "name": "Tanzania, United Republic of",
//         "code": "TZ"
//     },
//     {
//         "name": "Thailand",
//         "code": "TH"
//     },
//     {
//         "name": "Timor-Leste",
//         "code": "TL"
//     },
//     {
//         "name": "Togo",
//         "code": "TG"
//     },
//     {
//         "name": "Tokelau",
//         "code": "TK"
//     },
//     {
//         "name": "Tonga",
//         "code": "TO"
//     },
//     {
//         "name": "Trinidad and Tobago",
//         "code": "TT"
//     },
//     {
//         "name": "Tunisia",
//         "code": "TN"
//     },
//     {
//         "name": "Turkey",
//         "code": "TR"
//     },
//     {
//         "name": "Turkmenistan",
//         "code": "TM"
//     },
//     {
//         "name": "Turks and Caicos Islands",
//         "code": "TC"
//     },
//     {
//         "name": "Tuvalu",
//         "code": "TV"
//     },
//     {
//         "name": "Uganda",
//         "code": "UG"
//     },
//     {
//         "name": "Ukraine",
//         "code": "UA"
//     },
//     {
//         "name": "United Arab Emirates",
//         "code": "AE"
//     },
//     {
//         "name": "United Kingdom",
//         "code": "GB"
//     },
//     {
//         "name": "United States",
//         "code": "US"
//     },
//     {
//         "name": "United States Minor Outlying Islands",
//         "code": "UM"
//     },
//     {
//         "name": "Uruguay",
//         "code": "UY"
//     },
//     {
//         "name": "Uzbekistan",
//         "code": "UZ"
//     },
//     {
//         "name": "Vanuatu",
//         "code": "VU"
//     },
//     {
//         "name": "Venezuela",
//         "code": "VE"
//     },
//     {
//         "name": "Vietnam",
//         "code": "VN"
//     },
//     {
//         "name": "Virgin Islands, British",
//         "code": "VG"
//     },
//     {
//         "name": "Virgin Islands, U.S.",
//         "code": "VI"
//     },
//     {
//         "name": "Wallis and Futuna",
//         "code": "WF"
//     },
//     {
//         "name": "Western Sahara",
//         "code": "EH"
//     },
//     {
//         "name": "Yemen",
//         "code": "YE"
//     },
//     {
//         "name": "Zambia",
//         "code": "ZM"
//     },
//     {
//         "name": "Zimbabwe",
//         "code": "ZW"
//     },
//     {
//         "name": "Åland Islands",
//         "code": "AX"
//     }
// ]

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [names, setName] = useState({
        firstName: '',
        lastName: ''
    });

    const [formData, setFormData] = useState({
        FullName: '',
        EmailId: '',
        mobileno: '',
        InQuirySubject: '',
        Themeno: '3'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDiffChange = (e) => {
        const { name, value } = e.target;
        setName({
            ...names,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!names?.firstName) {
            errors.firstName = 'Please enter your first name';
        }
        if (!names?.lastName) {
            errors.lastName = 'Please enter your last name';
        }
        if (!formData.EmailId) {
            errors.EmailId = 'Please enter your email address';
        } else if (!/\S+@\S+\.\S+/.test(formData.EmailId)) {
            errors.EmailId = 'Please enter a valid email address';
        }
        if (!formData.mobileno) {
            errors.mobileno = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.mobileno)) {
            errors.mobileno = 'Phone must be a 10-digit number';
        }
        if (!formData.InQuirySubject) {
            errors.InQuirySubject = 'Please enter your message';
        }

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            const formattedData = {
                ...formData,
                FullName: `${names?.firstName} ${names?.lastName}`,
            }
            console.log("Formdaat", formattedData)
            await BespokeAPI(formattedData).then((res) => {
                if (res?.stat_msg === 'success') {
                    toast.success("Success! Thank you for contacting us. We’ve received your message and will get back to you shortly.")
                    setLoading(false);
                    window.scroll({
                        top: 0,
                        behavior: "smooth",
                    });
                } else {
                    toast.error("Something went wrong");
                    setLoading(false);
                    window.scroll({
                        top: 0,
                        behavior: "smooth",
                    });
                }
            })
            setFormData({
                FullName: '',
                EmailId: '',
                mobileno: '',
                Be_In_Message: '',
                Themeno: '3'
            });
            setName({
                firstName: '',
                lastName: ''
            })
        } else {
            setErrors(errors);
        }
    };

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <div className="elvee_container">
            <img src={`${storImagePath()}/images/HomePage/Contact/ContactBanner.jpg`} alt="Contact icons" className="elvee_contact-img" />

            <h1 className="elvee_heading-main">CONTACT US</h1>

            <div className="elvee_grid-container">
                <div className="elvee_grid-item">
                    <h2>Hours of Operation</h2>
                    <p>INDIA - 9:00am to 6:00pm (IST)</p>
                    <p>Mon-Sat (Excluding Holidays)</p>
                </div>
                <div className="elvee_grid-item">
                    <h2>Phone</h2>
                    <p>INDIA - (0261) 610-5100</p>
                </div>
                <div className="elvee_grid-item">
                    <h2>General Inquiries</h2>
                    <p>INDIA - info@elvee.in</p>
                </div>
            </div>

            <div className="elvee_contact-form">
                <h2>Contact Form</h2>
                <p>Our Customer service team is waiting to assist you,<br />Please Fill out all fields</p>
                <form onSubmit={handleSubmit}>
                    <div className="elvee_input_from">
                        <input
                            type="text"
                            placeholder="First Name: "
                            name="firstName"
                            value={names.firstName}
                            onChange={handleDiffChange}
                            className="elvee_input" />
                        {errors.firstName && <p className="for_error-message">{errors.firstName}</p>}
                    </div>
                    <div className="elvee_input_from">
                        <input
                            type="text"
                            placeholder="Last Name: "
                            name="lastName"
                            value={names.lastName}
                            onChange={handleDiffChange}
                            className="elvee_input" />
                        {errors.lastName && <p className="for_error-message">{errors.lastName}</p>}
                    </div>
                    <div className="elvee_input_from">
                        <input
                            type="tel"
                            name="mobileno"
                            value={formData.mobileno}
                            onChange={handleChange}
                            placeholder="Phone:"
                            className="elvee_input" />
                        {errors.mobileno && <p className="for_error-message">{errors.mobileno}</p>}
                    </div>
                    <div className="elvee_input_from">
                        <input
                            type="email"
                            name="EmailId"
                            value={formData.EmailId}
                            onChange={handleChange}
                            placeholder="Email ID:"
                            className="elvee_input" />
                        {errors.EmailId && <p className="for_error-message">{errors.EmailId}</p>}
                    </div>
                    {/* <input type="text" placeholder="Location :" className="elvee_input" />
                    <select className="elvee_input">
                        <option value="IN" defaultValue={'IN'} selected>India</option>
                        {CountryCode?.map((val, i) => {
                            return <option value={val?.code}>{val?.name}</option>
                        })}
                    </select> */}
                    <div className="elvee_input_from">
                        <textarea
                            type="text"
                            name="InQuirySubject"
                            value={formData.InQuirySubject}
                            onChange={handleChange}
                            placeholder="Message: "
                            className="elvee_input elvee_textarea" />
                        {errors.InQuirySubject && <p className="for_error-message">{errors.InQuirySubject}</p>}
                    </div>
                    <button type="submit" disabled={loading} className="elvee_button">{loading ? "Sending" : "Send"}</button>
                </form>
            </div>
        </div>
    );
}