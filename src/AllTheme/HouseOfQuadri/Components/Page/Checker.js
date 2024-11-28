// // import React from 'react';
// // import './ContactPage.scss';

// // const CountryCode = [
// //   {
// //       "name": "Afghanistan",
// //       "code": "AF"
// //   },
// //   {
// //       "name": "Albania",
// //       "code": "AL"
// //   },
// //   {
// //       "name": "Algeria",
// //       "code": "DZ"
// //   },
// //   {
// //       "name": "American Samoa",
// //       "code": "AS"
// //   },
// //   {
// //       "name": "Andorra",
// //       "code": "AD"
// //   },
// //   {
// //       "name": "Angola",
// //       "code": "AO"
// //   },
// //   {
// //       "name": "Anguilla",
// //       "code": "AI"
// //   },
// //   {
// //       "name": "Antarctica",
// //       "code": "AQ"
// //   },
// //   {
// //       "name": "Antigua and Barbuda",
// //       "code": "AG"
// //   },
// //   {
// //       "name": "Argentina",
// //       "code": "AR"
// //   },
// //   {
// //       "name": "Armenia",
// //       "code": "AM"
// //   },
// //   {
// //       "name": "Aruba",
// //       "code": "AW"
// //   },
// //   {
// //       "name": "Asia/Pacific Region",
// //       "code": "AP"
// //   },
// //   {
// //       "name": "Australia",
// //       "code": "AU"
// //   },
// //   {
// //       "name": "Austria",
// //       "code": "AT"
// //   },
// //   {
// //       "name": "Azerbaijan",
// //       "code": "AZ"
// //   },
// //   {
// //       "name": "Bahamas",
// //       "code": "BS"
// //   },
// //   {
// //       "name": "Bahrain",
// //       "code": "BH"
// //   },
// //   {
// //       "name": "Bangladesh",
// //       "code": "BD"
// //   },
// //   {
// //       "name": "Barbados",
// //       "code": "BB"
// //   },
// //   {
// //       "name": "Belarus",
// //       "code": "BY"
// //   },
// //   {
// //       "name": "Belgium",
// //       "code": "BE"
// //   },
// //   {
// //       "name": "Belize",
// //       "code": "BZ"
// //   },
// //   {
// //       "name": "Benin",
// //       "code": "BJ"
// //   },
// //   {
// //       "name": "Bermuda",
// //       "code": "BM"
// //   },
// //   {
// //       "name": "Bhutan",
// //       "code": "BT"
// //   },
// //   {
// //       "name": "Bolivia",
// //       "code": "BO"
// //   },
// //   {
// //       "name": "Bonaire, Sint Eustatius and Saba",
// //       "code": "BQ"
// //   },
// //   {
// //       "name": "Bosnia and Herzegovina",
// //       "code": "BA"
// //   },
// //   {
// //       "name": "Botswana",
// //       "code": "BW"
// //   },
// //   {
// //       "name": "Bouvet Island",
// //       "code": "BV"
// //   },
// //   {
// //       "name": "Brazil",
// //       "code": "BR"
// //   },
// //   {
// //       "name": "British Indian Ocean Territory",
// //       "code": "IO"
// //   },
// //   {
// //       "name": "Brunei Darussalam",
// //       "code": "BN"
// //   },
// //   {
// //       "name": "Bulgaria",
// //       "code": "BG"
// //   },
// //   {
// //       "name": "Burkina Faso",
// //       "code": "BF"
// //   },
// //   {
// //       "name": "Burundi",
// //       "code": "BI"
// //   },
// //   {
// //       "name": "Cambodia",
// //       "code": "KH"
// //   },
// //   {
// //       "name": "Cameroon",
// //       "code": "CM"
// //   },
// //   {
// //       "name": "Canada",
// //       "code": "CA"
// //   },
// //   {
// //       "name": "Cape Verde",
// //       "code": "CV"
// //   },
// //   {
// //       "name": "Cayman Islands",
// //       "code": "KY"
// //   },
// //   {
// //       "name": "Central African Republic",
// //       "code": "CF"
// //   },
// //   {
// //       "name": "Chad",
// //       "code": "TD"
// //   },
// //   {
// //       "name": "Chile",
// //       "code": "CL"
// //   },
// //   {
// //       "name": "China",
// //       "code": "CN"
// //   },
// //   {
// //       "name": "Christmas Island",
// //       "code": "CX"
// //   },
// //   {
// //       "name": "Cocos (Keeling) Islands",
// //       "code": "CC"
// //   },
// //   {
// //       "name": "Colombia",
// //       "code": "CO"
// //   },
// //   {
// //       "name": "Comoros",
// //       "code": "KM"
// //   },
// //   {
// //       "name": "Congo",
// //       "code": "CG"
// //   },
// //   {
// //       "name": "Congo, The Democratic Republic of the",
// //       "code": "CD"
// //   },
// //   {
// //       "name": "Cook Islands",
// //       "code": "CK"
// //   },
// //   {
// //       "name": "Costa Rica",
// //       "code": "CR"
// //   },
// //   {
// //       "name": "Croatia",
// //       "code": "HR"
// //   },
// //   {
// //       "name": "Cuba",
// //       "code": "CU"
// //   },
// //   {
// //       "name": "Curaçao",
// //       "code": "CW"
// //   },
// //   {
// //       "name": "Cyprus",
// //       "code": "CY"
// //   },
// //   {
// //       "name": "Czech Republic",
// //       "code": "CZ"
// //   },
// //   {
// //       "name": "Côte d'Ivoire",
// //       "code": "CI"
// //   },
// //   {
// //       "name": "Denmark",
// //       "code": "DK"
// //   },
// //   {
// //       "name": "Djibouti",
// //       "code": "DJ"
// //   },
// //   {
// //       "name": "Dominica",
// //       "code": "DM"
// //   },
// //   {
// //       "name": "Dominican Republic",
// //       "code": "DO"
// //   },
// //   {
// //       "name": "Ecuador",
// //       "code": "EC"
// //   },
// //   {
// //       "name": "Egypt",
// //       "code": "EG"
// //   },
// //   {
// //       "name": "El Salvador",
// //       "code": "SV"
// //   },
// //   {
// //       "name": "Equatorial Guinea",
// //       "code": "GQ"
// //   },
// //   {
// //       "name": "Eritrea",
// //       "code": "ER"
// //   },
// //   {
// //       "name": "Estonia",
// //       "code": "EE"
// //   },
// //   {
// //       "name": "Ethiopia",
// //       "code": "ET"
// //   },
// //   {
// //       "name": "Falkland Islands (Malvinas)",
// //       "code": "FK"
// //   },
// //   {
// //       "name": "Faroe Islands",
// //       "code": "FO"
// //   },
// //   {
// //       "name": "Fiji",
// //       "code": "FJ"
// //   },
// //   {
// //       "name": "Finland",
// //       "code": "FI"
// //   },
// //   {
// //       "name": "France",
// //       "code": "FR"
// //   },
// //   {
// //       "name": "French Guiana",
// //       "code": "GF"
// //   },
// //   {
// //       "name": "French Polynesia",
// //       "code": "PF"
// //   },
// //   {
// //       "name": "French Southern Territories",
// //       "code": "TF"
// //   },
// //   {
// //       "name": "Gabon",
// //       "code": "GA"
// //   },
// //   {
// //       "name": "Gambia",
// //       "code": "GM"
// //   },
// //   {
// //       "name": "Georgia",
// //       "code": "GE"
// //   },
// //   {
// //       "name": "Germany",
// //       "code": "DE"
// //   },
// //   {
// //       "name": "Ghana",
// //       "code": "GH"
// //   },
// //   {
// //       "name": "Gibraltar",
// //       "code": "GI"
// //   },
// //   {
// //       "name": "Greece",
// //       "code": "GR"
// //   },
// //   {
// //       "name": "Greenland",
// //       "code": "GL"
// //   },
// //   {
// //       "name": "Grenada",
// //       "code": "GD"
// //   },
// //   {
// //       "name": "Guadeloupe",
// //       "code": "GP"
// //   },
// //   {
// //       "name": "Guam",
// //       "code": "GU"
// //   },
// //   {
// //       "name": "Guatemala",
// //       "code": "GT"
// //   },
// //   {
// //       "name": "Guernsey",
// //       "code": "GG"
// //   },
// //   {
// //       "name": "Guinea",
// //       "code": "GN"
// //   },
// //   {
// //       "name": "Guinea-Bissau",
// //       "code": "GW"
// //   },
// //   {
// //       "name": "Guyana",
// //       "code": "GY"
// //   },
// //   {
// //       "name": "Haiti",
// //       "code": "HT"
// //   },
// //   {
// //       "name": "Heard Island and Mcdonald Islands",
// //       "code": "HM"
// //   },
// //   {
// //       "name": "Holy See (Vatican City State)",
// //       "code": "VA"
// //   },
// //   {
// //       "name": "Honduras",
// //       "code": "HN"
// //   },
// //   {
// //       "name": "Hong Kong",
// //       "code": "HK"
// //   },
// //   {
// //       "name": "Hungary",
// //       "code": "HU"
// //   },
// //   {
// //       "name": "Iceland",
// //       "code": "IS"
// //   },
// //   {
// //       "name": "India",
// //       "code": "IN"
// //   },
// //   {
// //       "name": "Indonesia",
// //       "code": "ID"
// //   },
// //   {
// //       "name": "Iran, Islamic Republic Of",
// //       "code": "IR"
// //   },
// //   {
// //       "name": "Iraq",
// //       "code": "IQ"
// //   },
// //   {
// //       "name": "Ireland",
// //       "code": "IE"
// //   },
// //   {
// //       "name": "Isle of Man",
// //       "code": "IM"
// //   },
// //   {
// //       "name": "Israel",
// //       "code": "IL"
// //   },
// //   {
// //       "name": "Italy",
// //       "code": "IT"
// //   },
// //   {
// //       "name": "Jamaica",
// //       "code": "JM"
// //   },
// //   {
// //       "name": "Japan",
// //       "code": "JP"
// //   },
// //   {
// //       "name": "Jersey",
// //       "code": "JE"
// //   },
// //   {
// //       "name": "Jordan",
// //       "code": "JO"
// //   },
// //   {
// //       "name": "Kazakhstan",
// //       "code": "KZ"
// //   },
// //   {
// //       "name": "Kenya",
// //       "code": "KE"
// //   },
// //   {
// //       "name": "Kiribati",
// //       "code": "KI"
// //   },
// //   {
// //       "name": "Korea, Republic of",
// //       "code": "KR"
// //   },
// //   {
// //       "name": "Kuwait",
// //       "code": "KW"
// //   },
// //   {
// //       "name": "Kyrgyzstan",
// //       "code": "KG"
// //   },
// //   {
// //       "name": "Laos",
// //       "code": "LA"
// //   },
// //   {
// //       "name": "Latvia",
// //       "code": "LV"
// //   },
// //   {
// //       "name": "Lebanon",
// //       "code": "LB"
// //   },
// //   {
// //       "name": "Lesotho",
// //       "code": "LS"
// //   },
// //   {
// //       "name": "Liberia",
// //       "code": "LR"
// //   },
// //   {
// //       "name": "Libyan Arab Jamahiriya",
// //       "code": "LY"
// //   },
// //   {
// //       "name": "Liechtenstein",
// //       "code": "LI"
// //   },
// //   {
// //       "name": "Lithuania",
// //       "code": "LT"
// //   },
// //   {
// //       "name": "Luxembourg",
// //       "code": "LU"
// //   },
// //   {
// //       "name": "Macao",
// //       "code": "MO"
// //   },
// //   {
// //       "name": "Madagascar",
// //       "code": "MG"
// //   },
// //   {
// //       "name": "Malawi",
// //       "code": "MW"
// //   },
// //   {
// //       "name": "Malaysia",
// //       "code": "MY"
// //   },
// //   {
// //       "name": "Maldives",
// //       "code": "MV"
// //   },
// //   {
// //       "name": "Mali",
// //       "code": "ML"
// //   },
// //   {
// //       "name": "Malta",
// //       "code": "MT"
// //   },
// //   {
// //       "name": "Marshall Islands",
// //       "code": "MH"
// //   },
// //   {
// //       "name": "Martinique",
// //       "code": "MQ"
// //   },
// //   {
// //       "name": "Mauritania",
// //       "code": "MR"
// //   },
// //   {
// //       "name": "Mauritius",
// //       "code": "MU"
// //   },
// //   {
// //       "name": "Mayotte",
// //       "code": "YT"
// //   },
// //   {
// //       "name": "Mexico",
// //       "code": "MX"
// //   },
// //   {
// //       "name": "Micronesia, Federated States of",
// //       "code": "FM"
// //   },
// //   {
// //       "name": "Moldova, Republic of",
// //       "code": "MD"
// //   },
// //   {
// //       "name": "Monaco",
// //       "code": "MC"
// //   },
// //   {
// //       "name": "Mongolia",
// //       "code": "MN"
// //   },
// //   {
// //       "name": "Montenegro",
// //       "code": "ME"
// //   },
// //   {
// //       "name": "Montserrat",
// //       "code": "MS"
// //   },
// //   {
// //       "name": "Morocco",
// //       "code": "MA"
// //   },
// //   {
// //       "name": "Mozambique",
// //       "code": "MZ"
// //   },
// //   {
// //       "name": "Myanmar",
// //       "code": "MM"
// //   },
// //   {
// //       "name": "Namibia",
// //       "code": "NA"
// //   },
// //   {
// //       "name": "Nauru",
// //       "code": "NR"
// //   },
// //   {
// //       "name": "Nepal",
// //       "code": "NP"
// //   },
// //   {
// //       "name": "Netherlands",
// //       "code": "NL"
// //   },
// //   {
// //       "name": "Netherlands Antilles",
// //       "code": "AN"
// //   },
// //   {
// //       "name": "New Caledonia",
// //       "code": "NC"
// //   },
// //   {
// //       "name": "New Zealand",
// //       "code": "NZ"
// //   },
// //   {
// //       "name": "Nicaragua",
// //       "code": "NI"
// //   },
// //   {
// //       "name": "Niger",
// //       "code": "NE"
// //   },
// //   {
// //       "name": "Nigeria",
// //       "code": "NG"
// //   },
// //   {
// //       "name": "Niue",
// //       "code": "NU"
// //   },
// //   {
// //       "name": "Norfolk Island",
// //       "code": "NF"
// //   },
// //   {
// //       "name": "North Korea",
// //       "code": "KP"
// //   },
// //   {
// //       "name": "North Macedonia",
// //       "code": "MK"
// //   },
// //   {
// //       "name": "Northern Mariana Islands",
// //       "code": "MP"
// //   },
// //   {
// //       "name": "Norway",
// //       "code": "NO"
// //   },
// //   {
// //       "name": "Oman",
// //       "code": "OM"
// //   },
// //   {
// //       "name": "Pakistan",
// //       "code": "PK"
// //   },
// //   {
// //       "name": "Palau",
// //       "code": "PW"
// //   },
// //   {
// //       "name": "Palestinian Territory, Occupied",
// //       "code": "PS"
// //   },
// //   {
// //       "name": "Panama",
// //       "code": "PA"
// //   },
// //   {
// //       "name": "Papua New Guinea",
// //       "code": "PG"
// //   },
// //   {
// //       "name": "Paraguay",
// //       "code": "PY"
// //   },
// //   {
// //       "name": "Peru",
// //       "code": "PE"
// //   },
// //   {
// //       "name": "Philippines",
// //       "code": "PH"
// //   },
// //   {
// //       "name": "Pitcairn Islands",
// //       "code": "PN"
// //   },
// //   {
// //       "name": "Poland",
// //       "code": "PL"
// //   },
// //   {
// //       "name": "Portugal",
// //       "code": "PT"
// //   },
// //   {
// //       "name": "Puerto Rico",
// //       "code": "PR"
// //   },
// //   {
// //       "name": "Qatar",
// //       "code": "QA"
// //   },
// //   {
// //       "name": "Reunion",
// //       "code": "RE"
// //   },
// //   {
// //       "name": "Romania",
// //       "code": "RO"
// //   },
// //   {
// //       "name": "Russian Federation",
// //       "code": "RU"
// //   },
// //   {
// //       "name": "Rwanda",
// //       "code": "RW"
// //   },
// //   {
// //       "name": "Saint Barthélemy",
// //       "code": "BL"
// //   },
// //   {
// //       "name": "Saint Helena",
// //       "code": "SH"
// //   },
// //   {
// //       "name": "Saint Kitts and Nevis",
// //       "code": "KN"
// //   },
// //   {
// //       "name": "Saint Lucia",
// //       "code": "LC"
// //   },
// //   {
// //       "name": "Saint Martin",
// //       "code": "MF"
// //   },
// //   {
// //       "name": "Saint Martin",
// //       "code": "MF"
// //   },
// //   {
// //       "name": "Saint Pierre and Miquelon",
// //       "code": "PM"
// //   },
// //   {
// //       "name": "Saint Vincent and the Grenadines",
// //       "code": "VC"
// //   },
// //   {
// //       "name": "Samoa",
// //       "code": "WS"
// //   },
// //   {
// //       "name": "San Marino",
// //       "code": "SM"
// //   },
// //   {
// //       "name": "Sao Tome and Principe",
// //       "code": "ST"
// //   },
// //   {
// //       "name": "Saudi Arabia",
// //       "code": "SA"
// //   },
// //   {
// //       "name": "Senegal",
// //       "code": "SN"
// //   },
// //   {
// //       "name": "Serbia",
// //       "code": "RS"
// //   },
// //   {
// //       "name": "Serbia and Montenegro",
// //       "code": "CS"
// //   },
// //   {
// //       "name": "Seychelles",
// //       "code": "SC"
// //   },
// //   {
// //       "name": "Sierra Leone",
// //       "code": "SL"
// //   },
// //   {
// //       "name": "Singapore",
// //       "code": "SG"
// //   },
// //   {
// //       "name": "Sint Maarten",
// //       "code": "SX"
// //   },
// //   {
// //       "name": "Slovakia",
// //       "code": "SK"
// //   },
// //   {
// //       "name": "Slovenia",
// //       "code": "SI"
// //   },
// //   {
// //       "name": "Solomon Islands",
// //       "code": "SB"
// //   },
// //   {
// //       "name": "Somalia",
// //       "code": "SO"
// //   },
// //   {
// //       "name": "South Africa",
// //       "code": "ZA"
// //   },
// //   {
// //       "name": "South Georgia and the South Sandwich Islands",
// //       "code": "GS"
// //   },
// //   {
// //       "name": "South Sudan",
// //       "code": "SS"
// //   },
// //   {
// //       "name": "Spain",
// //       "code": "ES"
// //   },
// //   {
// //       "name": "Sri Lanka",
// //       "code": "LK"
// //   },
// //   {
// //       "name": "Sudan",
// //       "code": "SD"
// //   },
// //   {
// //       "name": "Suriname",
// //       "code": "SR"
// //   },
// //   {
// //       "name": "Svalbard and Jan Mayen",
// //       "code": "SJ"
// //   },
// //   {
// //       "name": "Swaziland",
// //       "code": "SZ"
// //   },
// //   {
// //       "name": "Sweden",
// //       "code": "SE"
// //   },
// //   {
// //       "name": "Switzerland",
// //       "code": "CH"
// //   },
// //   {
// //       "name": "Syrian Arab Republic",
// //       "code": "SY"
// //   },
// //   {
// //       "name": "Taiwan",
// //       "code": "TW"
// //   },
// //   {
// //       "name": "Tajikistan",
// //       "code": "TJ"
// //   },
// //   {
// //       "name": "Tanzania, United Republic of",
// //       "code": "TZ"
// //   },
// //   {
// //       "name": "Thailand",
// //       "code": "TH"
// //   },
// //   {
// //       "name": "Timor-Leste",
// //       "code": "TL"
// //   },
// //   {
// //       "name": "Togo",
// //       "code": "TG"
// //   },
// //   {
// //       "name": "Tokelau",
// //       "code": "TK"
// //   },
// //   {
// //       "name": "Tonga",
// //       "code": "TO"
// //   },
// //   {
// //       "name": "Trinidad and Tobago",
// //       "code": "TT"
// //   },
// //   {
// //       "name": "Tunisia",
// //       "code": "TN"
// //   },
// //   {
// //       "name": "Turkey",
// //       "code": "TR"
// //   },
// //   {
// //       "name": "Turkmenistan",
// //       "code": "TM"
// //   },
// //   {
// //       "name": "Turks and Caicos Islands",
// //       "code": "TC"
// //   },
// //   {
// //       "name": "Tuvalu",
// //       "code": "TV"
// //   },
// //   {
// //       "name": "Uganda",
// //       "code": "UG"
// //   },
// //   {
// //       "name": "Ukraine",
// //       "code": "UA"
// //   },
// //   {
// //       "name": "United Arab Emirates",
// //       "code": "AE"
// //   },
// //   {
// //       "name": "United Kingdom",
// //       "code": "GB"
// //   },
// //   {
// //       "name": "United States",
// //       "code": "US"
// //   },
// //   {
// //       "name": "United States Minor Outlying Islands",
// //       "code": "UM"
// //   },
// //   {
// //       "name": "Uruguay",
// //       "code": "UY"
// //   },
// //   {
// //       "name": "Uzbekistan",
// //       "code": "UZ"
// //   },
// //   {
// //       "name": "Vanuatu",
// //       "code": "VU"
// //   },
// //   {
// //       "name": "Venezuela",
// //       "code": "VE"
// //   },
// //   {
// //       "name": "Vietnam",
// //       "code": "VN"
// //   },
// //   {
// //       "name": "Virgin Islands, British",
// //       "code": "VG"
// //   },
// //   {
// //       "name": "Virgin Islands, U.S.",
// //       "code": "VI"
// //   },
// //   {
// //       "name": "Wallis and Futuna",
// //       "code": "WF"
// //   },
// //   {
// //       "name": "Western Sahara",
// //       "code": "EH"
// //   },
// //   {
// //       "name": "Yemen",
// //       "code": "YE"
// //   },
// //   {
// //       "name": "Zambia",
// //       "code": "ZM"
// //   },
// //   {
// //       "name": "Zimbabwe",
// //       "code": "ZW"
// //   },
// //   {
// //       "name": "Åland Islands",
// //       "code": "AX"
// //   }
// // ]

// // export default function ContactPage() {
// //   return (
// //     <div className="elvee_container">
// //       <img src="https://i.ibb.co/WtPpQfH/Contact-us.jpg" alt="Contact icons" className="elvee_contact-img" />

// //       <h1 className="elvee_heading-main">CONTACT US</h1>

// //       <div className="elvee_grid-container">
// //         <div className="elvee_grid-item">
// //           <h2>Hours of Operation</h2>
// //           <p>INDIA - 9:00am to 6:00pm (IST)</p>
// //           <p>Mon-Sat (Excluding Holidays)</p>
// //         </div>
// //         <div className="elvee_grid-item">
// //           <h2>Phone</h2>
// //           <p>INDIA - (0261) 610-5100</p>
// //         </div>
// //         <div className="elvee_grid-item">
// //           <h2>General Inquiries</h2>
// //           <p>INDIA - info@elvee.in</p>
// //         </div>
// //       </div>

// //       <div className="elvee_contact-form">
// //         <h2>Contact Form</h2>
// //         <p>Our Customer service team is waiting to assist you,<br />Please Fill out all fields</p>
// //         <form>
// //           <input type="text" placeholder="First Name :" className="elvee_input" />
// //           <input type="text" placeholder="Last Name :" className="elvee_input" />
// //           <input type="tel" placeholder="Phone :" className="elvee_input" />
// //           <input type="email" placeholder="Email I'D :" className="elvee_input" />
// //           <input type="text" placeholder="Location :" className="elvee_input" />
// //           <select className="elvee_input">
// //             <option value="IN"  defaultValue={'IN'} selected>India</option>
// //            {CountryCode?.map((val,i)=>{
// //             return <option  value={val?.code}>{val?.name}</option>
// //            })}
// //           </select>
// //           <textarea placeholder="Message :" className={`elvee_input elvee_textarea`}></textarea>
// //           <button type="submit" className="elvee_button">Send</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // careers page

// // import React, { useState } from "react";
// // import "./ContactPage.scss";
// // import { IoMdArrowDropdown } from "react-icons/io";

// // const Checker = () => {
// //   const [showfrom, setfromshow] = useState(false);
// //   return (
// //     <div className="elev_career_page">
// //       <div className="elvee_banner_i">
// //         <img src="https://i.ibb.co/sHkHQNb/Career.jpg" alt="" />
// //       </div>
// //       <div className="elev_career_content">
// //         <h1>CAREER</h1>
// //         <p>A LARGE RANGE OF POSITIONS AND OPPORTUNITIES</p>
// //         <section className="about-section">
// //           <p>
// //             We recruit talented professionals who share our values and vision.
// //             We offer a dynamic work environment that encourages personal growth
// //             and development opportunities. Join us to be part of an innovative
// //             team that values creativity and excellence.
// //           </p>
// //         </section>
// //       </div>
// //       <div className="elvee_join_team_section">
// //         <img
// //           src="https://i.ibb.co/7Cw2sc2/Joint-Team.jpg"
// //           alt="Team meeting"
// //           className="team-meeting-photo"
// //         />
// //         <div className="join-team-content">
// //           <h2>JOIN OUR TEAM</h2>
// //           <p>
// //             Becoming a team member means becoming part of a diverse and dynamic
// //             team. We value and nurture talent, entrepreneurship and creativity.
// //             We're looking for individuals who can contribute to our growth and
// //             success. <br />
// //             As a human-sized luxury Maison, we hire talented people with
// //             strategic business minds and vision who still remain close tothe
// //             ground and <br /> result-oriented. We consider our employees as a
// //             key resource and strongly believe in the importance of individual
// //             performance to achieve <br /> collective performance. We provide our
// //             diversified talents with professional development, contributing to
// //             the growth of the Maison.
// //           </p>
// //         </div>
// //       </div>
// //       <div className="bar_elvee_sec">
// //         <p>
// //           view all of our job Offers , internship and apprenticeships on the
// //           Elvee Website in the "Talenets" Section.
// //         </p>
// //         <button
// //           onClick={() => setfromshow(!showfrom)}
// //           className="elvee_cta_button"
// //         >
// //           Discover Our Job Offers{" "}
// //           <IoMdArrowDropdown color="darkblue" style={showfrom && {
// //             rotate  :"180deg"
// //           }} size={26} />
// //         </button>
// //       </div>
// //       <hr
// //         style={{
// //           width: "95%",
// //           margin: "0 auto",
// //           marginBottom: "15px",
// //         }}
// //       />
// //       <div className="form_det_grid">
// //         {showfrom && (
// //           <form>
// //             <input
// //               type="text"
// //               placeholder="First Name :"
// //               className="elvee_input"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Last Name :"
// //               className="elvee_input"
// //             />
// //             <input
// //               type="email"
// //               placeholder="Email I'D :"
// //               className="elvee_input"
// //             />
// //             <input type="tel" placeholder="Phone :" className="elvee_input" />
// //             <input
// //               type="text"
// //               placeholder="Location :"
// //               className="elvee_input"
// //             />
// //             <div className="input_box_elvee">
// //               <input type="text" placeholder="Upload Resume : *" disabled />
// //               <label htmlFor="resume" className="elev_resume">
// //                 Choose a File
// //                 <input type="file" name="resume" id="resume" hidden />
// //               </label>
// //             </div>
// //             <select className="elvee_input">
// //               <option value="IN" defaultValue={"IN"} disabled selected>
// //                 Select designation
// //               </option>
// //               <option value="IN">Account</option>
// //               <option value="IN">Merchandise</option>
// //               <option value="IN">Sales</option>
// //               <option value="IN">Designer</option>
// //               <option value="IN">Digital Marketing</option>
// //               <option value="IN">IT</option>
// //             </select>
// //             <select className="elvee_input">
// //               <option value="IN" defaultValue={"IN"} disabled selected>
// //                 APPLY FOR COUNTRY
// //               </option>
// //               <option value="IN">INDIA</option>
// //               <option value="IN">USA</option>
// //               <option value="IN">UAE</option>
// //             </select>
// //             {/* <textarea placeholder="Message :" className={`elvee_input elvee_textarea`}></textarea> */}
// //             <button type="submit" className="elvee_button">
// //               Send
// //             </button>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checker;

// import React, { useState } from "react";
// import "./ContactPage.scss";
// import { MdDateRange } from "react-icons/md";
// import { ImClock2 } from "react-icons/im";

// const appointment = [
//   {
//     src: "https://i.ibb.co/LkwcDtj/Collection.jpg",
//     alt: "Collection",
//   },
//   {
//     src: "https://i.ibb.co/1JD9wpH/Engagement-Ring.jpg",
//     alt: "Engagement-Ring",
//   },
//   {
//     src: "https://i.ibb.co/dMv93Gb/Fine-Jewellery.jpg",
//     alt: "Fine-Jewellery",
//   },
//   {
//     src: "https://i.ibb.co/Z2sFYZj/Gold-Jewellery.jpg",
//     alt: "Gold-Jewellery",
//   },
//   {
//     src: "https://i.ibb.co/mH6fHBF/High-Jewellery.jpg",
//     alt: "High-Jewellery",
//   },
//   {
//     src: "https://i.ibb.co/fk5jS7X/Men-s-Jewellery.jpg",
//     alt: "Men-s-Jewellery",
//   },
//   {
//     src: "https://i.ibb.co/Yt3mK52/Others.jpg",
//     alt: "Others",
//   },
//   {
//     src: "https://i.ibb.co/W59vXrJ/Wedding-Ring.jpg",
//     alt: "Wedding-Ring",
//   },
// ];
// const Checker = () => {
//   const [selectedbox, setselectedbox] = useState(null);
//   return (
//     <div className="eleev_appointment_page">
//       <div className="elvee_banner_app">
//         <div className="content">
//           <p>
//             Visit our Jewelery stores schedule a personalized Jewelery
//             consultation at one of our stores to discover the perfect ethically
//             sourced fine jewlery piece for your milestone moments .
//           </p>
//         </div>
//         <div className="image">
//           <img src="https://i.ibb.co/kGTGwWJ/Book-Aporinment.jpg" alt="aa" />
//         </div>
//       </div>
//       <div className="grid_col_2_elvee">
//         <div className="grid_content_banner">
//           <h1> Book & appointment</h1>
//           <p>
//             Our commitment is to provide you with the highest level of jewelry
//             care services. Our experts will be delighted to offer you advice and
//             services to personalize your jewels, restore them, or simply
//             preserve their beauty and longevity.
//           </p>
//         </div>
//         <div className="grid_layout_card">
//           <div className="service_bar">
//             <span>selecte A service</span>
//           </div>
//           <div className="layout_elvee_grid">
//             {appointment?.map((val, i) => {
//               return (
//                 <div
//                   onClick={() => setselectedbox(i)}
//                   style={
//                     selectedbox === i
//                       ? {
//                           border: " 2px solid  rgb(0, 0, 34)",
//                         }
//                       : {}
//                   }
//                   className="elvee_card_app"
//                 >
//                   <div className="image_card_elevee">
//                     <img src={val?.src} alt="" />
//                   </div>
//                   <div className="det_elvee_card">{val?.alt}</div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="from_elvee_appointmnet">
//             <div className="service_bar">
//               <span>your appointment</span>
//             </div>
//             <div className="time_grid_elvee">
//               <label htmlFor="">
//                 <input type="text" placeholder="Date : dd/mm/yy" />
//                 <MdDateRange size={26} />
//               </label>
//               <label htmlFor="">
//                 <input type="text" placeholder="Time : hh:mm" />
//                 <ImClock2 size={26} />
//               </label>
//             </div>
//             <div className="service_bar">
//               <span>your details</span>
//             </div>
//             <form className="form_grid_elvee">
//             <input type="text" placeholder="Title :" className="elvee_input_from" />
//             <input type="text" placeholder="First Name :" className="elvee_input_from" />
//            <input type="text" placeholder="Last Name :" className="elvee_input_from" />
//            <input type="tel" placeholder="Phone :" className="elvee_input_from" />
//            <input type="email" placeholder="Email I'D :" className="elvee_input_from" />
//            <input type="text" placeholder="Location :" className="elvee_input_from" />
//            <div className="btn_el_vee">
//             <button type="submit">Book Appointment</button>
//            </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checker;


// // {
// //   ``
// // }`
  
// // @import "../../../../scss/Variable.scss";

// // $scrollbar-width: 2px;
// // $scrollbar-track-color: #f1f1f100;
// // $scrollbar-thumb-color: #e4e4e4;
// // $settedcOLOR: rgba(112, 128, 144, 0.096);

// // .hoq_filterDrawer {
// //   font-family: $fontTenorSans !important;
// //   .MuiPaper-root.MuiAccordion-root:last-of-type {
// //     font-family: $fontTenorSans !important;
// //   }
// //   .MuiAccordionSummary-root {
// //     font-family: $fontTenorSans !important;
// //   }
// // }

// // @mixin custom-scrollbar {
// //   &::-webkit-scrollbar {
// //     width: $scrollbar-width;
// //     display: block;
// //   }

// //   &::-webkit-scrollbar-track {
// //     background: $scrollbar-track-color;
// //   }

// //   &::-webkit-scrollbar-thumb {
// //     background-color: $scrollbar-thumb-color;
// //     border-radius: $scrollbar-width / 2;
// //   }
// // }

// // .hoq_dynamic_Collections {
// //   width: 100%;
// //   height: auto;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: center;
// //   align-items: center;
// //   font-family: $fontTenorSans;

// //   .filter_btn_mobile {
// //     width: 1442px;
// //     margin: 0 auto;
// //     // display: none;
// //     .fb_btn {
// //       margin: 0 auto;
// //       width: 98%;
// //       display: flex;
// //       align-items: center;
// //       justify-content: flex-start;
// //       // box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
// //       padding: 12px 0;
// //       border-radius: 3px;
// //     }
// //   }
// //   .Banner {
// //     width: 100%;
// //     height: 45vh;
// //     background-color: rgba(225, 233, 233, 0.192);
// //     text-align: center;
// //     background-repeat: no-repeat;
// //     background-size: cover;
// //     background-position: center;
// //     display: flex;
// //     align-items: flex-end;
// //     justify-content: center;
// //     padding: 30px 0;
// //     h1 {
// //       font-family: $fontDmSans;
// //       font-weight: 600;
// //       letter-spacing: 0px;
// //       color: rgba(255, 255, 255, 0.925);
// //     }
// //   }
// //   .collection_info {
// //     display: flex;
// //     align-items: center;
// //     flex-direction: column;
// //     height: auto;
// //     padding: 20px 0;
// //     text-align: center;
// //     h1 {
// //       font-family: $fontTenorSans;
// //       font-weight: 600;
// //       font-size: 35px;
// //     }
// //     .para {
// //       width: 80%;
// //       padding: 10px 65px;
// //       p {
// //         font-size: 17px;
// //         font-family: $fontDmSans;
// //         letter-spacing: 0.4px;
// //         transition: 0.5s ease;
// //       }
// //       span {
// //         cursor: pointer;
// //         font-size: 16px;
// //         position: relative;
// //         font-family: $fontCrimsonTextRegular;
// //         color: black;
// //         &::after {
// //           content: "";
// //           position: absolute;
// //           width: 100%;
// //           border-radius: 4px;
// //           height: 2px;
// //           background-color: rgba(247, 240, 230, 0.767);
// //           left: 0;
// //           bottom: -2px;
// //         }
// //         &::before {
// //           content: "";
// //           position: absolute;
// //           transition: 0.5s ease-in;
// //           width: 0%;
// //           height: 2px;
// //           background-color: black;
// //           left: 0;
// //           z-index: 12;
// //           bottom: -2px;
// //         }
// //       }
// //       &:hover {
// //         span {
// //           &::before {
// //             width: 100%;
// //           }
// //         }
// //       }
// //     }
// //   }
// //   .bread_crumb_section {
// //     width: 1442px;
// //     margin: 0 auto;
// //     display: flex;
// //     height: 80px;
// //     align-items: center;
// //     padding-left: 10px;
// //     span {
// //       cursor: pointer;
// //       display: flex;
// //       align-items: center;
// //       gap: 5px;
// //       font-weight: 500;
// //       &:hover {
// //         text-decoration: underline;
// //       }
// //     }
// //     .hoq_breadcums_port {
// //       display: flex;
// //       align-items: center;
// //       gap: 5px;
// //     }
// //   }

// //   .filter_section {
// //     width: 1442px;
// //     margin: 0 auto;
// //     display: flex;
// //     height: auto;
// //     margin-bottom: 2rem;
// //     justify-content: center;
// //     top: 170px;
// //     .filter_accordian_section {
// //       width: 20%;
// //       overflow-y: scroll;
// //       height: 100vh;
// //       border-radius: 4px;
// //       position: sticky;
// //       display: flex;
// //       top: 170px;
// //       flex-direction: column;
// //       padding: 0 10px;
// //       gap: 0;
// //       font-family: $fontDmSans;
// //       .breadcrumb {
// //         width: 100%;
// //         display: flex;
// //         margin: 0;
// //         padding: 15px 0px;
// //         span {
// //           font-family: $fontDmSans;
// //           font-size: 16px;
// //         }
// //       }
// //       .filter_results {
// //         width: 100%;
// //         height: 100px;
// //         display: flex;
// //         align-items: center;
// //         justify-content: space-between;
// //         span:last-child {
// //           margin-right: 10px;
// //         }
// //       }
// //       &::-webkit-scrollbar {
// //         display: none;
// //       }
// //       &:hover {
// //         overflow-y: auto;
// //         @include custom-scrollbar;
// //       }
// //       .accordian {
// //         box-shadow: none;
// //         margin: 0;
// //         padding: 5px 0;
// //         margin-right: 10px;
// //         .hoq_category_names {
// //           margin: 0;
// //           padding: 0;
// //         }
// //         .accordian_details_col {
// //           padding: 0;
// //           width: 100%;
// //           margin: 0;
// //           .price {
// //             display: flex;
// //             .price_checkbox {
// //               padding: 0 4px;
// //               margin: 0;
// //             }
// //             .hoq_subCategory_name_price {
// //               padding-left: 5px;

// //               display: flex;
// //               width: 100%;
// //               margin: 0 auto;
// //               flex-direction: row-reverse;
// //               justify-content: space-between;
// //             }
// //           }
// //           .hoq_subCategory_name {
// //             display: flex;
// //             margin: 0;
// //             padding: 5px 10px;
// //             align-items: center;
// //             justify-content: space-between;
// //             color: #727174;
// //             font-size: 15px;
// //             &:last-child {
// //               margin-bottom: 15px;
// //             }
// //           }
// //         }
// //       }
// //     }
// //     .cc_list {
// //       width: 100%;
// //       display: flex;
// //       flex-direction: column;
// //       align-items: center;
// //       .filter_select {
// //         width: 100%;
// //         justify-content: space-between;
// //         display: flex;
// //         align-items: center;
// //         padding: 15px 0;
// //         div {
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           border: 1px solid #d3d3d3;
// //           border-radius: 4px;
// //           padding: 5px;
// //           .label {
// //             font-size: 16px;
// //           }
// //           select {
// //             border: none;
// //             border-radius: none;
// //             font-size: 15px;
// //             background: transparent;
// //             .option {
// //               font-size: 12px;
// //             }
// //           }
// //         }
// //       }
// //       .C_Card {
// //         width: 23.6%;
// //         height: 550px;
// //         position: relative;
// //         box-shadow: none;
// //         border-radius: 0.3px;
// //         margin: 10px;
// //         overflow: hidden;
// //         &:hover {
// //           .hoq_plus {
// //             display: flex;
// //             opacity: 1;
// //           }
// //         }
// //         .hoq_CartSkelton {
// //           background-color: #f6f6f6a6 !important;
// //         }
// //         .hoq_plus {
// //           position: absolute;
// //           bottom: 6rem;
// //           width: 100%;
// //           height: 10vh;
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           padding: 0 10px;
// //           z-index: 55;
// //           display: none;
// //           opacity: 0.3;
// //           button {
// //             transition: 0.3s ease-in;
// //             border: none;
// //             outline: none;
// //             background-color: transparent;
// //             color: rgba(116, 114, 114, 0.466);
// //             opacity: 0.5;
// //             font-size: 2rem;
// //           }
// //         }
// //         .hoq_product_label {
// //           position: absolute;
// //           top: 10px;
// //           z-index: 56;
// //           display: flex;
// //           flex-direction: column;
// //           font-family: $fontDmSans;
// //           left: 7px;
// //           gap: 5px;
// //           span {
// //             border-radius: 5px;
// //             text-align: center;
// //             padding: 2.5px 6px;
// //             font-size: 12px;
// //             font-weight: 500;
// //             border-radius: 3px;
// //           }
// //           .hoq_instock {
// //             background-color: green !important;
// //             text-align: center;
// //             border: none !important;
// //             color: white !important;
// //           }
// //           .hoq_bestSeller {
// //             background-color: #1e90ff !important;
// //             text-align: center;
// //             border: none !important;
// //             color: white !important;
// //           }
// //           .hoq_intrending {
// //             background-color: purple!important;
// //             text-align: center;
// //             border: none !important;
// //             color: white !important;
// //           }
// //           .hoq_newarrival {
// //             background-color: deeppink!important;
// //             text-align: center;
// //             border: none !important;
// //             color: white !important;
// //           }
// //         }
// //         .image {
// //           width: 100%;
// //           height: 450px;
// //           overflow: hidden;
// //           position: relative;
// //           overflow: hidden;
// //           img {
// //             width: 100%;
// //             height: auto;
// //           }
// //           background-color: $settedcOLOR;
// //           .rollup_video {
// //             position: absolute;
// //             z-index: 45;
// //             width: 100%;
// //             height: 100%;
// //             top: 0;
// //             video {
// //               width: 100%;
// //               // height: 100%;
// //               object-fit: contain !important;
// //               transition: 0.3s ease-in-out;
// //             }
// //           }
// //           .rollup_img {
// //             width: 100%;
// //             height: 100%;
// //             object-fit: cover;
// //             img {
// //               width: 100%;
// //               height: 100%;
// //               object-fit: contain !important;
// //               border: transparent;
// //               outline: none;
// //               mix-blend-mode: multiply;
// //               &:hover {
// //                 transition: 0.3s ease-in-out;
// //               }
// //             }
// //           }
// //           img {
// //             width: 100%;
// //             object-fit: contain !important;
// //             border: transparent;
// //             outline: none;
// //             mix-blend-mode: multiply;
// //             transition: 0.3s ease-in-out;
// //           }
// //         }
// //         .det {
// //           width: 100%;
// //           height: auto;
// //           display: flex;
// //           align-items: center;
// //           flex-direction: column;
// //           text-align: center;
// //           font-family: $fontCrimsonTextRegular;
// //           overflow: hidden;
// //           padding: 8px 0px;
// //           h2 {
// //             font-size: 19px;
// //             font-weight: 400;
// //             color: #7d7f85;
// //             padding: 0;
// //             width: 100%;
// //             height: auto;
// //             display: -webkit-box;
// //             text-align: center;
// //             -webkit-line-clamp: 1;
// //             -webkit-box-orient: vertical;
// //             overflow: hidden;
// //             padding: 2px 10px;
// //           }
// //           .jewel_parameter {
// //             margin-top: -8px;
// //             display: flex;
// //             align-items: center;
// //             color: #7d7f85;
// //             font-size: 0px !important;
// //             font-family: $fontCrimsonTextRegular !important;
// //             &:has(span) {
// //               display: flex;
// //               align-items: center;
// //               gap: 2px;
// //               letter-spacing: 0.2px !important;
// //             }
// //           }
// //           .hoq_prod_mtcolr_price {
// //             color: #7d7f85;
// //             span {
// //               color: #7d7f85;
// //               font-size: 14px;
// //             }
// //           }
// //         }
// //       }
// //       .collections_list {
// //         width: 100%;
// //         // padding: 10px;
// //         display: flex;
// //         align-items: center;
// //         flex-wrap: wrap;
// //         .loading_container {
// //           width: 100%;
// //           height: 100vh;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           img {
// //             width: 5%;
// //           }
// //         }

// //         .C_Card {
// //           width: 23.6%;
// //           height: 550px;
// //           position: relative;
// //           box-shadow: none;
// //           border-radius: 0.3px;
// //           margin: 10px;
// //           overflow: hidden;
// //           &:hover {
// //             .hoq_plus {
// //               display: flex;
// //               opacity: 1;
// //             }
// //           }
// //           .hoq_CartSkelton {
// //             background-color: #f6f6f6a6 !important;
// //           }

// //           .hoq_plus {
// //             position: absolute;
// //             bottom: 6rem;
// //             width: 100%;
// //             height: 10vh;
// //             display: flex;
// //             align-items: center;
// //             justify-content: space-between;
// //             padding: 0 10px;
// //             z-index: 55;
// //             display: none;
// //             opacity: 0.3;
// //             button {
// //               transition: 0.3s ease-in;
// //               border: none;
// //               outline: none;
// //               background-color: transparent;
// //               color: rgba(116, 114, 114, 0.466);
// //               opacity: 0.5;
// //               font-size: 2rem;
// //             }
// //           }
// //           .hoq_product_label {
// //             position: absolute;
// //             top: 10px;
// //             z-index: 56;
// //             display: flex;
// //             flex-direction: column;
// //             font-family: $fontDmSans;
// //             left: 7px;
// //             gap: 5px;
// //             span {
// //               border-radius: 5px;
// //               text-align: center;
// //               padding: 2.5px 6px;
// //               font-size: 12px;
// //               font-weight: 500;
// //               border-radius: 3px;
// //               background-color: white;
// //             }
// //             .hoq_instock {
// //               border: 1px solid #00b894;
// //               text-align: center;
// //               color: #00b894;
// //             }
// //             .hoq_bestSeller {
// //               border: 1px solid #1e90ff;
// //               color: #1e90ff;
// //             }
// //             .hoq_intrending {
// //               border: 1px solid #d63031;
// //               color: #d63031;
// //             }
// //             .hoq_newarrival {
// //               border: 1px solid #191970;
// //               color: #191970;
// //             }
// //           }
// //           .image {
// //             width: 100%;
// //             height: 450px;
// //             overflow: hidden;
// //             position: relative;
// //             overflow: hidden;
// //             background-color: rgba(112, 128, 144, 0.096);
// //             .rollup_video {
// //               position: absolute;
// //               z-index: 45;
// //               width: 100%;
// //               height: 100%;
// //               top: 0;
// //               video {
// //                 width: 100%;
// //                 // height: 100%;
// //                 // object-fit: cover;
// //                 transition: 0.3s ease-in-out;
// //               }
// //             }
// //             .rollup_img {
// //               width: 100%;
// //               height: 100%;
// //               object-fit: cover;
// //               img {
// //                 width: 100%;
// //                 // height: 100%;
// //                 object-fit: contain !important;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //               }
// //             }
// //             img {
// //               width: 100%;
// //               // height: 100%;
// //               object-fit: contain;
// //               border: transparent;
// //               outline: none;
// //               mix-blend-mode: multiply;
// //               &:hover {
// //                 transition: 0.3s ease-in-out;
// //                 scale: 1.02;
// //               }
// //             }
// //           }
// //           .det {
// //             width: 100%;
// //             height: auto;
// //             display: flex;
// //             align-items: center;
// //             flex-direction: column;
// //             text-align: center;
// //             font-family: $fontCrimsonTextRegular;
// //             overflow: hidden;
// //             padding: 8px 0px;
// //             h2 {
// //               font-size: 19px;
// //               font-weight: 400;
// //               color: #7d7f85;
// //               padding: 0;
// //               width: 100%;
// //               height: auto;
// //               display: -webkit-box;
// //               text-align: center;
// //               -webkit-line-clamp: 1;
// //               -webkit-box-orient: vertical;
// //               overflow: hidden;
// //               padding: 2px 10px;
// //             }
// //             .jewel_parameter {
// //               margin-top: -8px;
// //               display: flex;
// //               align-items: center;
// //               color: #7d7f85;
// //               font-size: 15px;
// //               &:has(span) {
// //                 display: flex;
// //                 align-items: center;
// //                 gap: 2px;
// //                 letter-spacing: 0.5px;
// //               }
// //             }
// //             .hoq_prod_mtcolr_price {
// //               color: #7d7f85;
// //               span {
// //                 color: #7d7f85;
// //                 font-size: 14px;
// //               }
// //             }
// //           }
// //         }
// //       }
// //       .NoProductFound {
// //         width: 100%;
// //         height: 90vh;
// //         display: flex;
// //         background-color: #cfcfcf17;
// //         align-items: center;
// //         overflow: hidden;
// //         justify-content: center;
// //         border-radius: 5px;
// //         text-align: center;
// //         flex-direction: column;
// //         h1 {
// //           font-size: 1.7rem;
// //           font-weight: 500;
// //           width: 80%;
// //         }
// //       }
// //     }
// //   }
// //   .pagination_sec {
// //     width: 100%;
// //     height: 100%;
// //     .pagination-bar {
// //       width: 100%;
// //       display: flex;
// //       justify-content: center;
// //       align-items: center;
// //       height: 200px;
// //       .pagination-btn {
// //         .Mui-selected {
// //           background-color: #c20000;
// //           padding: 20px 15px;
// //           color: white;
// //         }
// //       }
// //     }
// //   }

// //   // Media queries for responsiveness
// //   @media screen and (max-width: 1452px) {
// //     width: 100%;
// //     overflow: hidden;
// //     .Banner {
// //       margin-top: -1.2rem;
// //       z-index: -555;
// //       height: 30vh;
// //     }
// //     .bread_crumb_section {
// //       margin-top: -1rem;
// //     }
// //     .collection_info {
// //       display: flex;
// //       align-items: center;
// //       flex-direction: column;
// //       height: auto;
// //       padding: 20px 0;
// //       text-align: center;
// //       h1 {
// //         font-family: $fontTenorSans;
// //         font-weight: 600;
// //         font-size: 35px;
// //       }
// //       .para {
// //         width: 100%;
// //         padding: 10px;
// //         p {
// //           font-size: 15px;
// //           font-family: $fontDmSans;
// //           letter-spacing: 0.4px;
// //           transition: 0.5s ease;
// //         }
// //       }
// //     }
// //     .filter_section {
// //       display: flex;
// //       width: 100%;
// //       .cc_list {
// //         .collections_list {
// //           width: 100%;
// //           display: grid;
// //           padding: 10px;
// //           grid-template-columns: repeat(4, 1fr);
// //           // grid-template-rows: minmax(200px,auto);
// //           transition: 0.5s ease-in;
// //           .C_Card {
// //             width: auto;
// //             height: 500px;
// //             .hoq_plus {
// //               bottom: 5.5rem;
// //             }
// //             .image {
// //               // width: 100%;
// //               overflow: hidden;
// //               height: 80%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 80%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //               .det {
// //                 height: auto;
// //               }
// //             }
// //             .det {
// //               h2 {
// //               }
// //               .jewel_parameter {
// //                 line-height: 18px;
// //                 display: flex;
// //                 flex-wrap: wrap;
// //                 text-align: center;
// //                 justify-content: center;
// //                 align-items: center;
// //                 &:has(span) {
// //                   display: flex;
// //                   align-items: center;
// //                   letter-spacing: 0.5px;
// //                 }
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 14px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 1180px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 470px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 5rem;
// //             }
// //             .det {
// //               h2 {
// //               }
// //               .jewel_parameter {
// //                 line-height: 12px;
// //                 margin-bottom: 2px;
// //                 &:has(span) {
// //                   display: flex;
// //                   align-items: center;
// //                   letter-spacing: 0.5px;
// //                 }
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 14px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 1090px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 420px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 4.3rem;
// //             }
// //             .det {
// //               h2 {
// //               }
// //               .jewel_parameter {
// //                 line-height: 12px;
// //                 &:has(span) {
// //                   display: flex;
// //                   align-items: center;
// //                   letter-spacing: 0.5px;
// //                 }
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 14px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 1004px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 370px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 5rem;
// //             }
// //             .image {
// //               overflow: hidden;
// //               height: 75%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 75%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //               .det {
// //                 height: auto;
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 818px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 330px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 4rem;
// //             }
// //             .det {
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 font-size: 10px;
// //                 font-weight: 500;
// //                 margin-top: 5px;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 10px;
// //                   font-weight: 500;
// //                 }
// //               }
// //               .jewel_parameter {
// //                 line-height: 10px;
// //                 margin-bottom: 2px;
// //                 &:has(span) {
// //                   display: flex;
// //                   align-items: center;
// //                   letter-spacing: 0.5px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 768px) {
// //     .filter_section {
// //       display: flex;
// //       width: 100%;
// //       .cc_list {
// //         .collections_list {
// //           width: 100%;
// //           display: grid;
// //           padding: 10px;
// //           grid-template-columns: repeat(2, 1fr);
// //           transition: 0.5s ease-in;
// //           .C_Card {
// //             width: auto;
// //             height: 580px;
// //             .hoq_plus {
// //               bottom: 5rem;
// //             }
// //             .image {
// //               // width: 100%;
// //               overflow: hidden;
// //               height: 85%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 85%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //               .det {
// //                 height: auto;
// //               }
// //             }
// //             .det {
// //               h2 {
// //                 font-size: 21px;
// //               }
// //               .jewel_parameter {
// //                 font-size: 16px !important;
// //                 &:has(span) {
// //                   display: flex;
// //                   align-items: center;
// //                   gap: 5px;
// //                   letter-spacing: 0.5px;
// //                 }
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 14px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 692px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 520px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 4.8rem !important;
// //             }
// //             .hoq_plus {
// //               bottom: 3rem;
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 600px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 440px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 3.7rem !important;
// //             }
// //             .det {
// //               h2 {
// //                 font-size: 18px;
// //               }
// //               .jewel_parameter {
// //                 line-height: 12px;
// //                 margin-bottom: -2px;
// //                 &:has(span) {
// //                   display: flex;
// //                   align-items: center;
// //                   letter-spacing: 0.5px;
// //                 }
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 14px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }

// //   @media screen and (max-width: 530px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 420px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 3.3rem !important;
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 480px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 385px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 4.8rem !important;
// //             }
// //             .image {
// //               overflow: hidden;
// //               height: 78%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 80%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //               .det {
// //                 height: auto;
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 450px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 390px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 4.5rem !important;
// //             }
// //             .image {
// //               overflow: hidden;
// //               height: 79%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 80%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //             }
// //             .det {
// //               .jewel_parameter {
// //                 line-height: 9px !important;
// //               }
// //               .hoq_prod_mtcolr_price {
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 418px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           .C_Card {
// //             width: auto;
// //             height: 350px;
// //             transition: 0.5s ease-in;
// //             .hoq_plus {
// //               bottom: 5.4rem !important;
// //             }
// //             .image {
// //               overflow: hidden;
// //               height: 75%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 75%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //             }
// //             .det {
// //               gap: 2px;
// //               .jewel_parameter {
// //                 line-height: 9px !important;
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 12px !important;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 390px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           padding: 2px !important;
// //           .C_Card {
// //             width: auto;
// //             height: 340px;
// //             transition: 0.5s ease-in;
// //             .image {
// //               overflow: hidden;
// //               height: 70%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 70%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //             }
// //             .det {
// //               gap: 2px;
// //               .jewel_parameter {
// //                 line-height: 9px !important;
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   font-size: 11px !important;
// //                   margin-bottom: 5px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //       .pagination_sec {
// //         .pagination-btn .MuiPaginationItem-root {
// //           font-size: 0.875rem; /* Slightly larger font size */
// //           width: 1rem; /* Adjust width */
// //           height: 1rem; /* Adjust height */
// //           margin: 0 !important;
// //         }

// //         .pagination-btn .MuiPaginationItem-root {
// //           font-size: 1rem; /* Larger font size for desktop */
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 358px) {
// //     .filter_section {
// //       .cc_list {
// //         .collections_list {
// //           padding: 2px !important;
// //           .C_Card {
// //             width: auto;
// //             transition: 0.5s ease-in;
// //             .image {
// //               overflow: hidden;
// //               height: 70%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 75%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //             }
// //             .det {
// //               gap: 2px;
// //               .jewel_parameter {
// //                 line-height: 9px !important;
// //               }
// //               .hoq_prod_mtcolr_price {
// //                 color: #7d7f85;
// //                 span {
// //                   color: #7d7f85;
// //                   margin-bottom: 5px;
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //       .pagination_sec {
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         .pagination-btn .MuiPaginationItem-root {
// //           font-size: 0.875rem; /* Slightly larger font size */
// //           width: 0.7rem !important; /* Adjust width */
// //           height: 0.6rem !important; /* Adjust height */
// //           margin: 0 !important;
// //         }
// //         .pagination-btn .MuiPaginationItem-root {
// //           font-size: 1rem; /* Larger font size for desktop */
// //         }
// //       }
// //     }
// //   }
// //   @media screen and (max-width: 310px) {
// //     .filter_section {
// //       display: flex;
// //       width: 100%;
// //       .cc_list {
// //         .collections_list {
// //           width: 100%;
// //           display: grid;
// //           padding: 10px;
// //           grid-template-columns: repeat(1, 1fr);
// //           transition: 0.5s ease-in;
// //           .C_Card {
// //             width: auto;
// //             height: 400px;
// //             .hoq_plus {
// //               bottom: 3rem !important;
// //             }
// //             .image {
// //               overflow: hidden;
// //               height: 84%;
// //               position: relative;
// //               overflow: hidden;
// //               background-color: rgba(112, 128, 144, 0.096);
// //               .rollup_video {
// //                 position: absolute;
// //                 z-index: 45;
// //                 width: 100%;
// //                 height: 84%;
// //                 top: 0;
// //                 video {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   transition: 0.3s ease-in-out;
// //                 }
// //               }
// //               .rollup_img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: cover;
// //                 img {
// //                   width: 100%;
// //                   height: 100%;
// //                   object-fit: cover;
// //                   border: transparent;
// //                   outline: none;
// //                   mix-blend-mode: multiply;
// //                 }
// //               }
// //               img {
// //                 width: 100%;
// //                 height: 100%;
// //                 object-fit: contain;
// //                 border: transparent;
// //                 outline: none;
// //                 mix-blend-mode: multiply;
// //                 &:hover {
// //                   transition: 0.3s ease-in-out;
// //                   scale: 1.02;
// //                 }
// //               }
// //               .det {
// //                 height: auto;
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   }
// // }

//   // `






import { useEffect } from 'react';

const useZoom = (containerRef, imgRef) => {
  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;

    const onZoom = (e) => {
      const x = e.clientX - container.offsetLeft;
      const y = e.clientY - container.offsetTop;
      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = "scale(2.5)";
    };

    const offZoom = () => {
      img.style.transformOrigin = `center center`;
      img.style.transform = "scale(1)";
    };

    if (container) {
      container.addEventListener("mousemove", onZoom);
      container.addEventListener("mouseover", onZoom);
      container.addEventListener("mouseleave", offZoom);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", onZoom);
        container.removeEventListener("mouseover", onZoom);
        container.removeEventListener("mouseleave", offZoom);
      }
    };
  }, [containerRef, imgRef]);
};

export default useZoom;

