// import React, { useEffect, useState } from 'react'
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import Footer from '../../Home/Footer/Footer';

// const FunFact = () => {

//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     fetch(`${storImagePath()}/html/FunFact.html`)
//       .then((response) => response.text())
//       .then((html) => {
//         setHtmlContent(html);
//         console.log('htmlssssssss', html);
//       })
//       .catch((error) => {
//         console.error('Error fetching the HTML file:', error);
//       });
//   }, []);


//   return (
//     <div className='contactMain'>
//       <div className='daimondsEveryAbout'>
//         <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
//           <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//         </div>
//         <Footer />
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
//         <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
//       </div>
//     </div>
//   )
// }

// export default FunFact



import React, { useEffect } from 'react'
import './FunFact.modul.scss'
import Footer from '../../Home/Footer/Footer'

export default function FunFact() {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
    return (
        <div className="smr_funfact_FooterTopMain" >
            <div className="smr_funfact_FooterTopMain_sub" >
                <p className="text_center" style={{ textAlign: "center", paddingBlock: "60px", color: 'black' }}>
                    <strong>
                        <span className="TitleMainFoterExpert" style={{ fontFamily: "Calibri", fontSize: "40px", fontFamily: " FreightDispProBook-Regular, Times New Roman , serif" }}>FUN FACT</span>
                    </strong>
                </p>
                <div>
                    <div className='smiling-ServicePolicyMain'>
                        <div className="container2">
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', textAlign: "center" }}>
                                <li>
                                    <span style={{ fontFamily: "Arial", fontSize: "18.0000pt" }}>
                                        1.&nbsp;
                                    </span>
                                    <strong>
                                        <em>
                                            <span style={{ fontFamily: "Arial", fontSize: "16.0000pt" }}>
                                                Diamonds
                                            </span>
                                        </em>
                                    </strong>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '1px', textAlign: 'center', marginTop: '40px' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "14.0000pt" }}>
                                                History of diamonds
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The earliest diamonds were found in India in 4th century bc, although the
                                    youngest of these deposits were formed 900 million years ago. A majority
                                    of these early stones were transported along the network of trade routes
                                    that connected India and china, commonly known as the silk road until the
                                    18th century, India was thought to be the only source of diamonds. When
                                    the Indian diamond mines were depleted, the quest for alternate sources
                                    began. Although a small deposit was found in brazil in 1725, the supply
                                    was not enough to meet world demands.
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,
                                    }}
                                >
                                    The discovery of diamonds in south Africa played a pivotal role in the
                                    world’s diamond history. Before diamonds were discovered in kimberley,
                                    they were extremely rare, and were only found in small quantities in India
                                    and brazil. Today, south Africa continues to be one of the world’s major
                                    producers, and it is estimated that up to 65% of the world’s diamonds were
                                    mined from an African mine.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: "center", marginTop: '40px' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Top 5 mining countries for diamond
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,
                                        background: "rgb(254,254,254)"
                                    }}
                                >
                                    Although the world’s first diamond deposits are believed to have formed
                                    900 million years ago, the first stones were found in India in the fourth
                                    century bc.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Russia
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Home to arguably the richest and largest diamond resources in the world,
                                    Russia tops the list with more than 12 open-pit mines. With mining
                                    starting in 1947, Russia now tops the world’s diamond production
                                    hierarchy. It is also the world’s largest exporter of rough diamonds by
                                    volume. The country’s major miner is a group of companies called&nbsp;
                                </span>
                                <a href="https://www.nsenergybusiness.com/news/alrosa-uncovers-230-ct-diamond-the-largest-in-recent-years/">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16
                                            }}
                                        >
                                            alrosa
                                        </span>
                                    </u>
                                </a>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    , which produces the majority of Russia’s diamond output.
                                </span>
                            </p>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Russia mined 38 to 39 million carats in 2014 (out of which alrosa mined
                                    36.2 million carats), while 2018 saw this increase to 43 million carats.
                                    Most of the country’s mining deposits and activities occur in the siberian
                                    region of yakutia.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Botswana
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Africa’s top diamond producer, botswana sits second in this global list.
                                    Since the 1870s, most gem-quality stones have been mined in Africa and, in
                                    2017, the value of diamond exports from African countries in the global
                                    market was valued at $9.65bn.
                                </span>
                            </p>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Diamond exploration started in botswana in the 1950s, with mining
                                    officially launching in 1971. Some of the world’s highest-yielding mines
                                    were unearthed in botswana by the mid-1980s. The African country’s
                                    diamonds are generally larger than those mined in Russia and boast a
                                    better quality. They also constitute about 25% of botswana’s gdp and 60%
                                    of its exports.
                                </span>
                            </p>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    In terms of value, botswana leads the list of the world’s top
                                    diamond-producing countries, despite being the second by volume. Botswana
                                    produced about 18 millions of carats in 2019.
                                </span>
                            </p>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>&nbsp;</span>
                                <em>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 17,

                                        }}
                                    >
                                        Democratic republic of congo
                                    </span>
                                </em>
                            </p>
                            <p
                                style={{
                                    marginTop: "5.0000pt",
                                    marginBottom: "5.0000pt",
                                    background: "rgb(254,254,254)"
                                }}
                            >
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    The democratic republic of congo (drc) comes third in the line of diamond
                                    mining countries by volume, although the informal sector (and not mining
                                    companies) is responsible for most of its production. It is estimated that
                                    about 700,000 artisanal miners belonging to this sector operate the
                                    country’s mines in search of the precious stone. The joint venture between
                                    the drc government and belgian company sibeka, miniere de bakwange (miba),
                                    is the only commercial diamond mining company in the country. , miniere de
                                    bakwange produced 9 million carats in 2000. Approximately one-third of
                                    drc’s diamonds are marketed by de beers, which has a 20% stake in sibeka.
                                </span>
                            </p>
                            <p
                                style={{
                                    marginTop: "5.0000pt",
                                    marginBottom: "5.0000pt",
                                    background: "rgb(254,254,254)"
                                }}
                            >
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Although production has declined in recent years due to constant political
                                    turmoil, drc holds the potential for more diamond production.&nbsp;
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Australia
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Fourth in the world when it comes to diamond production, Australia began
                                    to mine the stones commercially from 1981.since 1983, Australia’s largest
                                    diamond mine, argyle, an open-pit mine, has been producing a steady stream
                                    of natural coloured diamonds at the rate of more than 12 million carats
                                    per year. Located in the east kimberley region of western Australia, the
                                    rio tinto-owned argyle’s diamonds made up the initial source of the
                                    country’s up-and-coming diamond industry. However, only about 5% of its
                                    production is gem-quality output. In 2013, rio tinto transformed argyle
                                    into an underground mine to extend its life up to 2020, at least.
                                </span>
                            </p>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    There are two other mines in Australia: the now shut down kimberley
                                    diamonds-owned ellendale, and the merlin diamonds ltd’s merlin mine (both
                                    in the northern territory).
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "13.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span style={{ fontFamily: "Arial", fontSize: "13.0000pt" }}>
                                            Canada
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Mining in canada began in 1998, after evidence of diamond-bearing
                                    kimberlite pipes was found in the northwest territories in 1991. Ekati,
                                    owned by dominion diamonds, was the first operational mine in canada. This
                                    paved the way for more mines, which soon made canada the world’s
                                    fifth-biggest diamond mining country. The country’s other three active
                                    mines are&nbsp;
                                </span>
                                <a href="https://www.nsenergybusiness.com/news/newsrio-tinto-discovers-1877-carat-diamond-at-diavik-mine-in-canada-031215-4743992/">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16
                                            }}
                                        >
                                            diavik
                                        </span>
                                    </u>
                                </a>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;(owned by a rio tinto subsidiary), snap lake and victor. The latter
                                    two are de beers-operated mines. In 2013, canada extracted 10.6 million
                                    carats diamonds worth $1.9 billion, which increased to 23 million carats
                                    worth $2.7 billion in 2018.
                                </span>
                            </p>
                            <ul
                                className="decimal_type"
                                style={{ listStyleType: "undefined", marginTop: '40px', lineHeight: '3' }}
                            >
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Top 5 countries that exports diamond (feb, 2019)
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        United States: 16% of total exported diamonds.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        India: 15.3%
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Hong kong: 14.5%
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Belgium: 12.9%
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Israel: 12.4%
                                    </span>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: 'center', marginTop: "40px" }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Diamond cutting
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Diamond cutting
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;is the practice of changing a&nbsp;
                                </span>
                                <a
                                    href="https://en.wikipedia.org/wiki/Diamond_(gemstone)"
                                    title="Diamond (gemstone)"
                                >
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            diamond
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;from a rough stone into a&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Facet" title="Facet">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            faceted
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;gem. Cutting diamond requires specialized knowledge, tools,
                                    equipment, and techniques because of its extreme difficulty.
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Diamond cutting, as well as overall processing, is concentrated in a few
                                    cities around the world. The main diamond trading centers are&nbsp;
                                </span>
                                <a
                                    href="https://en.wikipedia.org/wiki/Antwerp_diamond_district"
                                    title="Antwerp diamond district"
                                >
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            antwerp
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    ,&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Tel_Aviv" title="Tel Aviv">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            tel aviv
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , and&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Dubai" title="Dubai">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            dubai
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;from where roughs are sent to the main processing centers of India
                                    and china. Diamonds are cut and polished in&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Surat" title="Surat">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            surat
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    ,&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/India" title="India">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            India
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;and the&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/China" title="China">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            chinese
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;cities of&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Guangzhou" title="Guangzhou">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            guangzhou
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;and&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Shenzhen" title="Shenzhen">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            shenzhen
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    .&nbsp;India in recent years has held between 19–31% of the world market
                                    in polished diamonds and china has held 17% of the world market share in a
                                    recent year.
                                </span>
                                <sup>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,
                                            verticalAlign: "super",

                                        }}
                                    >
                                        &nbsp;
                                    </span>
                                </sup>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Another important diamond center is&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/New_York_City" title="New York City">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            new york city
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    .
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    About 72% of diamond cutting &amp; polishing is done in India.
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;
                                </span>
                            </p>
                            <ul
                                className="decimal_type"
                                style={{ listStyleType: "undefined", marginTop: '40px', lineHeight: '3' }}
                            >
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Some amazing facts about diamonds
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        The ancient romans and greeks believed that diamonds were tears cried by
                                        the gods or splinters from falling stars, and romans believed that
                                        cupid’s arrows were tipped with diamonds (perhaps the earliest
                                        association between diamonds and romantic love).
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Diamonds are billions of years old—in some cases more than three billion
                                        years old.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Diamonds form about 100 miles below ground and have been carried to the
                                        earth’s surface by deep volcanic eruptions.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        The word diamond derives from the greek word “adamas,” which means
                                        invincible or indestructible. Which makes sense because…
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Diamonds are the very hardest natural substance. The only thing that can
                                        scratch a diamond is another diamond.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        The largest diamond ever discovered was called the&nbsp;
                                    </span>
                                    <a href="https://www.history.com/this-day-in-history/worlds-largest-diamond-found">
                                        <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                            cullinan
                                        </span>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;diamond, and weighed in at an amazing 3106 carats, or 1.33 pound
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>D</span>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: "12.0000pt",

                                        }}
                                    >
                                        iamonds are the birthstone for the month of april, meaning that
                                        april-born ladies have an extra reason to put sparkling diamond
                                        jewellery on their birthday wish list (or to buy diamonds for
                                        themselves).
                                    </span>
                                </li>
                            </ul>
                            <ul style={{ paddingLeft: '0px', marginTop: "40px", textAlign: 'center' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Different shapes of diamond
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Round diamonds
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>The&nbsp;</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>round cut diamond</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;is the most popular diamond shape, representing approximately 75% of
                                    all diamonds sold. Due to the mechanics of its shape, the round diamond is
                                    generally superior to fancy diamond shapes at the proper reflection of
                                    light, maximizing potential brightness.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "13.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span style={{ fontFamily: "Arial", fontSize: "13.0000pt" }}>
                                            Princess cut diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The&nbsp;princess cut diamond, first created in 1980 by betzalel ambar and
                                    israel itzkowitz, is the most popular fancy cut, especially for engagement
                                    rings. Like round cut diamonds, princess cut diamonds are a good choice
                                    for their flexibility in working in almost any style of ring.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Oval diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Created by lazare kaplan in the 1960's, oval diamonds are a modified&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    brilliant-cut
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;(like virtually all round cuts). Because the two shapes possess a
                                    similar&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    fire
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;and&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    brilliance
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , the oval is an ideal choice for a customer who likes the look of a round
                                    diamond, but wants something more unique. Oval diamonds have the added
                                    advantage of an elongated shape, which can create the illusion of greater
                                    size. The slender shape can also make the finger of the wearer appear
                                    longer and slimmer, an effect often desired.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Marquise diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The football-shaped marquise diamonds are a modified&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    brilliant-cut
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    . The name is derived from the marquise of pompadour, for whom king louis
                                    xiv of france allegedly had a stone fashioned to resemble what he
                                    considered her perfectly shaped mouth. Because marquise diamonds are long
                                    and narrow, they can also create the illusion of greater size. Carat for
                                    carat, the marquise diamond has one of the largest&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    crown
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;surface areas of any diamond shape.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Pear shaped diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    The modified&nbsp;
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>brilliant-cut</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>&nbsp;</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    pear shaped diamond
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;is a combination of a round and a marquise shape, with a tapered
                                    point on one end. The diamond is always worn with the narrow end pointing
                                    toward the hand of the wearer. Like marquise and oval cuts, the pear
                                    shaped diamond comes in a variety of slim to wide cuts, and has the added
                                    benefit of making the wearer's fingers appear longer and slimmer.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "13.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span style={{ fontFamily: "Arial", fontSize: "13.0000pt" }}>
                                            Cushion cut diamonds
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The cushion cut diamond once referred to as old mine cut) combines a
                                    square cut with rounded corners, much like a pillow (hence the name). This
                                    classic cut has been around for almost 200 years, and for the first
                                    century of its existence was the most popular diamond shape (similar to
                                    round cut today). Until the early 20th century, the cushion cut diamond
                                    was the de facto diamond shape. The standards for cushion cut vary more
                                    than most other shapes, and personal taste will dictate choice. While
                                    generally less brilliant than round brilliant diamonds, cushion cut
                                    diamonds often have better&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    fire
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , which is part of their appeal.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Emerald cut diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The unique look of the emerald cut diamond is created by the&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    step cuts
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;of its&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    pavilion
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;and its large, open&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    table
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    . Instead of the sparkle of a&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    brilliant-cut
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , emerald cut diamonds produce a hall-of-mirrors effect, with the
                                    interplay of light and dark planes. While less fiery, the long lines and
                                    dramatic flashes of light give the emerald cut an elegant appeal. The
                                    shape was originally developed for the cutting of emeralds, thus the name.
                                    Emerald cut diamonds vary from nearly square to a narrow rectangle. The
                                    classic emerald cut diamond has a&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    length to width
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;ratio of around 1.50. If you prefer the look of the square emerald
                                    cut diamond, be sure to consider the asscher cut as well.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Asscher diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>The&nbsp;</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    asscher cut diamond
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;was first produced in 1902 by the asscher brothers of holland,
                                    famous at the time for cutting the world's largest rough stone (the
                                    cullinan, at 3,106 carats). Asscher cut diamonds originally peaked in
                                    popularity in the 1920's, and could recently be found only in antique
                                    jewellery shops. Around 2002, one hundred years after the first asscher
                                    cut diamond was created, the shape began to make a comeback, spurred on by
                                    cut modifications that gave the shape more brilliance than traditional
                                    asscher cut diamonds.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Radiant cut diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The first&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    radiant cut
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;was designed by henry grossbard of the&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    radiant cut
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;diamond company (rcdc) in 1977. Prior to this invention, all
                                    diamonds with square or step-
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    cut
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;edges appeared less brilliant.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>the&nbsp;</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    radiant cut diamond
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;is the first square cut (the second being the princess) to have a
                                    complete&nbsp;
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>brilliant-cut</span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;facet pattern applied to both the crown and pavilion, creating a
                                    vibrant and lively square diamond. First popular in the 1980's, the
                                    cropped corner square shape of the radiant is a nice bridge between a
                                    cushion and a princess cut, and for that reason looks beautiful set with
                                    both rounded or square cornered diamonds.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 8 }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Heart shaped diamond
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The creation of a&nbsp;heart-shaped diamond&nbsp;dates back to the late
                                    1400s when the&nbsp;diamond cut&nbsp;was considered a symbol of royalty.
                                    In 1562, the mary queen of scots sent queen elizabeth a&nbsp;heart-shaped
                                    diamond&nbsp;ring, which has gone down in&nbsp;history&nbsp;as one of the
                                    most notorious symbols of friendship and goodwill between royals.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', marginTop: "100px", textAlign: "center" }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: "18.0000pt",

                                        }}
                                    >
                                        2.&nbsp;
                                    </span>
                                    <strong>
                                        <em>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "16.0000pt",

                                                }}
                                            >
                                                Gemstones
                                            </span>
                                        </em>
                                    </strong>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', textAlign: 'center', margin: "40px 0px" }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Types of gemstones
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", marginLeft: "22.15px" }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",

                                            }}
                                        >
                                            Ruby stone
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    An early recorded transport and trading of rubies arises in the literature
                                    on the&nbsp;
                                </span>
                                <a
                                    href="https://en.wikipedia.org/wiki/North_Silk_Road"
                                    title="North Silk Road"
                                >
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16
                                            }}
                                        >
                                            north silk road
                                        </span>
                                    </u>
                                </a>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;of china, wherein about 200&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Before_Christ" title="Before Christ">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16
                                            }}
                                        >
                                            bc
                                        </span>
                                    </u>
                                </a>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;rubies were carried along this ancient&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Trackway" title="Trackway">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16
                                            }}
                                        >
                                            trackway
                                        </span>
                                    </u>
                                </a>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    &nbsp;moving westward from china.
                                </span>
                            </p>
                            <p>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Some other sources explain that the Indian culture worships rubies to be
                                    the "gemstone of the sun", leader of the nine planets.&nbsp;
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,
                                        background: "rgb(249,249,247)"
                                    }}
                                >
                                    The majority of ruby deposits are found in asia in countries including
                                    myanmar, thailand, India, pakistan, and nepal. Rubies are found along the
                                    stretch of land that borders the himalayan mountain range.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: "22.15px" }}>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "13.0000pt",
                                            background: "rgb(249,249,247)"
                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: "13.0000pt",
                                                background: "rgb(249,249,247)"
                                            }}
                                        >
                                            Sapphire stone
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The sapphire is the&nbsp;
                                </span>
                                <a href="http://www.jewelsforme.com/birthstones">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            birthstone
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;for the month of september. The name sapphire is derived from the
                                    latin word ““saphirus” and the greek word “sapheiros,” both meaning blue.
                                    Some believe that the name sapphire is derived from its association with
                                    the planet saturn..&nbsp;
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    The ancient greeks and romans also claimed blue sapphires held mystical
                                    powers, giving their owners wisdom and health. In the middle ages, blue
                                    sapphires were often worn by royalty as amulets to ward off evil.
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Sapphire is the september birthstone. It is also gifted on 5th and 45th
                                    wedding anniversaries.
                                </span>
                            </p>
                            <p>
                                <u>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            textDecoration: "underline",
                                            fontSize: 16,

                                        }}
                                    >
                                        Significant sapphire deposits are found
                                    </span>
                                </u>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;in&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Australia" title="Australia">
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        Australia
                                    </span>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    ,&nbsp;
                                </span>
                                <div style={{ wordWrap: "break-word" }}>
                                    <a href="https://en.wikipedia.org/wiki/Cambodia" title="Cambodia">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            cambodia
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Cameroon" title="Cameroon">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            cameroon
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/China" title="China">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            china
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        &nbsp;(
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Shandong" title="Shandong">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            shandong
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ),&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Colombia" title="Colombia">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            colombia
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Ethiopia" title="Ethiopia">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            ethiopia
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/India" title="India">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            India
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        &nbsp;(
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Kashmir" title="Kashmir">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            kashmir
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ),&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Kenya" title="Kenya">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            kenya
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Laos" title="Laos">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            laos
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Madagascar" title="Madagascar">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            madagascar
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Malawi" title="Malawi">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            malawi
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Mozambique" title="Mozambique">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            mozambique
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Myanmar" title="Myanmar">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            myanmar
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        &nbsp;(
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Burma" title="Burma">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            burma
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ),&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Nigeria" title="Nigeria">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            nigeria
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Rwanda" title="Rwanda">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            rwanda
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Sri_Lanka" title="Sri Lanka">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            sri lanka
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Tanzania" title="Tanzania">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            tanzania
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Thailand" title="Thailand">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            thailand
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ,&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/United_States" title="United States">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            United States
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        &nbsp;(
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Montana" title="Montana">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            montana
                                        </span>
                                    </a>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: 16,

                                        }}
                                    >
                                        ) and&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Vietnam" title="Vietnam">
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                fontSize: 16,

                                            }}
                                        >
                                            vietnam
                                        </span>
                                    </a>
                                </div>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Every sapphire mine produces a wide range of quality, and origin is not a
                                    guarantee of quality. For sapphire,&nbsp;
                                </span>
                                <a href="https://en.wikipedia.org/wiki/Kashmir" title="Kashmir">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            kashmir
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;receives the highest premium, although burma, sri lanka, and
                                    madagascar also produce large quantities of fine quality gems.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: "22.15px" }}>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "13.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <em>
                                        <span style={{ fontFamily: "Arial", fontSize: "13.0000pt" }}>
                                            Emerald stone
                                        </span>
                                    </em>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The first known&nbsp;emeralds&nbsp;were mined in egypt around 1500 bc. One
                                    of cleopatra's favorite stones was&nbsp;emerald, and her passion for the
                                    stone was well documented.&nbsp;Emeralds&nbsp;were discovered in south
                                    america in the 16th century by the spanish. They were used by the incas
                                    well before this discovery.
                                </span>
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Emerald&nbsp;is a shade of&nbsp;green, a color
                                    that&nbsp;symbolizes&nbsp;balance and harmony.&nbsp;Green&nbsp;has strong
                                    associations with nature and the environment and is seen as the color of
                                    luck.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: "11.25px", marginTop: '50px' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "14.0000pt" }}>
                                                Interesting facts about emerald
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <ul
                                className="decimal_type"
                                style={{ listStyleType: "undefined", marginLeft: 8, lineHeight: '2' }}
                            >
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Emerald is one of the four recognized precious gemstones. The others
                                        are&nbsp;
                                    </span>
                                    <a href="https://www.thespruce.com/40th-wedding-anniversary-2301891">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                ruby
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        ,&nbsp;
                                    </span>
                                    <a href="https://www.thesprucecrafts.com/september-birthstone-facts-4690100">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                sapphire
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        , and&nbsp;diamond.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Emerald is the birthstone of may and is the traditional gift for the
                                        20th, 35th and 55th&nbsp;
                                    </span>
                                    <a href="https://www.thespruce.com/top-anniversary-jewelry-gift-ideas-4161219">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                wedding anniversary
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;in the us.&nbsp;
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Emerald is made from beryl just like the gemstone aquamarine.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Emerald gets its green coloring from trace amounts of chromium and/or
                                        vanadium.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        A 1-carat emerald appears larger than a 1-carat diamond because of its
                                        lower density.
                                    </span>
                                </li>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: "Wingdings",
                                            fontSize: "12.0000pt",

                                        }}
                                    >
                                        Ø&nbsp;
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Arial",
                                            fontSize: "12.0000pt",

                                        }}
                                    >
                                        Colombia yields the largest amount&nbsp;of emeralds, contributing to
                                        more than 50 percent of all emerald production worldwide.
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>&nbsp;</span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        The oldest emeralds are about 2.97 billion years old.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        The first known emeralds&nbsp;were&nbsp;mined in egypt around&nbsp;1500
                                        bc.
                                    </span>
                                </li>
                            </ul>
                            <ul
                                className="decimal_type"
                                style={{ listStyleType: "undefined", marginLeft: 8, lineHeight: '2', marginTop: '60px' }}
                            >
                                <li>
                                    <strong>
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "14.0000pt" }}>
                                                Types of precious emerald found
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Bahia emerald
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Carolina emperor 310 carats uncut, 64.8 carats cut; discovered in the
                                        United States in 2009.&nbsp;
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/Chalk_Emerald"
                                        title="Chalk Emerald"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Chalk emerald
                                            </span>
                                        </u>
                                    </a>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/Duke_of_Devonshire_Emerald"
                                        title="Duke of Devonshire Emerald"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Duke of devonshire emerald
                                            </span>
                                        </u>
                                    </a>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Emerald of saint louis, 51.60 carats cut; discovered in austria,
                                        probably habachtal, resides in the&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/National_Museum_of_Natural_History_(France)"
                                        title="National Museum of Natural History (France)"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                national museum of natural history
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        , paris
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/Gachal%C3%A1_Emerald"
                                        title="Gachalá Emerald"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Gachalá emerald
                                            </span>
                                        </u>
                                    </a>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/Mogul_Mughal_Emerald"
                                        title="Mogul Mughal Emerald"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Mogul mughal emerald
                                            </span>
                                        </u>
                                    </a>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        Patricia emerald 632 carats uncut, discovered in colombia in 1920,
                                        resides in the&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/American_Museum_of_Natural_History"
                                        title="American Museum of Natural History"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                american museum of natural history
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        , new york
                                    </span>
                                </li>
                            </ul>

                            <ul style={{ listStyleType: "undefined", marginLeft: 8, marginTop: '60px' }}>
                                <li>
                                    <span style={{ fontFamily: "Symbol", fontSize: "14.0000pt" }}>
                                        ·&nbsp;
                                    </span>
                                    <strong>
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "14.0000pt" }}>
                                                List of rare gemstones
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", marginLeft: "4.75px", lineHeight: '2' }}>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Painite" title="Painite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Painite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1956 in ohngaing in myanmar. The mineral was
                                        named in honor of the british gemologist arthur charles davy pain. In
                                        2005, painite was described by the guinness book of world records as the
                                        rarest gem mineral on earth.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Hibonite" title="Hibonite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Hibonite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1956 in madagascar. It was named after the
                                        discoverer the french geologist paul hibon. Gem quality hibonite has
                                        been found only in myanmar.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Red_beryl" title="Red beryl">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Red beryl
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;or bixbite was discovered in an area near beaver, utah in 1904 and
                                        named after the american mineralogist maynard bixby.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Jeremejevite" title="Jeremejevite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Jeremejevite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1883 in Russia and named after its discoverer,
                                        pawel wladimirowich jeremejew (1830–1899).
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Chambersite" title="Chambersite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Chambersite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1957 in chambers county, texas, us, and named
                                        after the deposit's location.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Taaffeite" title="Taaffeite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Taaffeite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1945. It was named after the discoverer, the
                                        irish gemologist count edward charles richard taaffe.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Musgravite" title="Musgravite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Musgravite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1967 in the musgrave mountains in south
                                        Australia and named for the location.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a
                                        href="https://en.wikipedia.org/wiki/Grandidierite"
                                        title="Grandidierite"
                                    >
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Grandidierite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered by antoine françois alfred lacroix (1863–1948) in
                                        1902 in tuléar province, madagascar. It was named in honor of the french
                                        naturalist and explorer alfred grandidier (1836–1912).
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Poudretteite" title="Poudretteite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Poudretteite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in 1965 at the poudrette quarry in canada and named
                                        after the quarry's owners and operators, the poudrette family.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Serendibite" title="Serendibite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Serendibite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered in sri lanka by dunil palitha gunasekera in 1902
                                        and named after serendib, the old arabic name for sri lanka.
                                    </span>
                                </li>
                                <li>
                                    <span style={{ fontFamily: "Wingdings", fontSize: "11.0000pt" }}>
                                        Ø&nbsp;
                                    </span>
                                    <a href="https://en.wikipedia.org/wiki/Zektzerite" title="Zektzerite">
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                                Zektzerite
                                            </span>
                                        </u>
                                    </a>
                                    <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                        &nbsp;was discovered by bart cannon in 1968 on kangaroo ridge near
                                        washington pass in okanogan county, washington, usa. The mineral was
                                        named in honor of mathematician and geologist jack zektzer, who
                                        presented the material for study in 1976.
                                    </span>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', marginTop: '100px', textAlign: 'center' }}>
                                <li>
                                    <span style={{ fontFamily: "Arial", fontSize: "18.0000pt" }}>
                                        3.&nbsp;
                                    </span>
                                    <strong>
                                        <em>
                                            <span style={{ fontFamily: "Arial", fontSize: "16.0000pt" }}>
                                                Diamond education
                                            </span>
                                        </em>
                                    </strong>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', marginTop: '40px', textAlign: 'center' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span style={{ fontFamily: "Arial", fontSize: "14.0000pt" }}>
                                                Guide to diamond shape
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p
                                style={{
                                    marginTop: "0.0000pt",
                                    marginBottom: "0.0000pt",

                                }}
                            >
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    Diamond shape refers to the silhouette or general look of a stone. There
                                    are many different shapes available in the market today, but there are 11
                                    shapes that are purchased most frequently. An important fact to note is
                                    that all shapes that are not a round brilliant are referred to as fancy
                                    shape diamonds. Each shape differs not only in physical form, but in light
                                    return as well. How much sparkle a stone emits is correlated with how many
                                    facets it has and their general pattern. While a round brilliant shape
                                    will emit the most amount of light return because of its ideal facet
                                    pattern, shapes like emerald and asscher, which are step cuts, will not
                                    have as much sparkle but are appealing because of their unique style.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', marginTop: "40px", textAlign: "center" }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Guide to diamond carat
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Carat weight is one of the 4cs of diamonds that measures a diamond’s
                                    weight and size. The term "carat" is derived from the carob seeds that
                                    were used to balance scales in ancient times.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Today’s metric carat is equal to 200 milligrams, or one-fifth of a gram,
                                    and there are approximately 142 carats to an ounce. Carats are further
                                    divided into points. There are 100 points in a carat. A half-carat diamond
                                    may be referred to as a 50-point stone.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Because large diamonds are rare, they generally have a greater value per
                                    carat. When considering the value of a diamond or gemstone, two diamonds
                                    or gems of equal carat weight can have differing price points based on the
                                    quality of&nbsp;
                                </span>
                                <a href="https://www.jewelers.org/education/diamond-buying-guide/diamond-cut">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            cut
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    ,&nbsp;
                                </span>
                                <a href="https://www.jewelers.org/education/diamond-buying-guide/diamond-color">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            color
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;and&nbsp;
                                </span>
                                <a href="https://www.jewelers.org/education/diamond-buying-guide/diamond-clarity-scale">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            clarity
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    &nbsp;-- the three other diamond quality factors. A professional jeweler,
                                    like&nbsp;
                                </span>
                                <a href="https://www.jewelers.org/find-a-jeweler">
                                    <u>
                                        <span
                                            style={{
                                                fontFamily: "Arial",
                                                textDecoration: "underline",
                                                fontSize: 16,

                                            }}
                                        >
                                            a member of jewelers of america
                                        </span>
                                    </u>
                                </a>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , is educated to distinguish and explain the various diamond quality
                                    factors so you find the highest quality diamond that fits your budget
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", paddingLeft: "0px", marginTop: "40px", textAlign: "center" }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Guide to diamond clarity
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    A diamond’s clarity, one of diamonds 4cs, is affected by any external and
                                    internal characteristics created by nature when the diamond was formed or
                                    as a result of the cutting process.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Characteristics such as internal spots or lines are called&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    inclusions
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    . Although these marks make each stone unique, the fewer the inclusions,
                                    the more valuable the stone. Inclusions can sometimes interfere with the
                                    passage of light through the stone, diminishing the sparkle and value of
                                    the diamond.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    According to the quality analysis system of the gemological institute of
                                    america (gia), clarity is graded on a scale ranging from flawless (fl) to
                                    imperfect (i). Only a tiny percentage of diamonds ever achieve a grade of
                                    flawless.
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', marginTop: "40px", textAlign: 'center' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Guide to diamond cut
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    To many, cut is considered the most important of aspect of a gemstone’s
                                    quality and value. Diamond cut affects some of its optical and physical
                                    properties including how it reflects light and “sparkles.”
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                                <li>
                                    <h2 style={{ lineHeight: "20.4500pt", }}>
                                        <span style={{ fontFamily: "Wingdings", fontSize: "12.0000pt" }}>
                                            Ø&nbsp;
                                        </span>
                                        <span style={{ fontFamily: "Arial", fontSize: "12.0000pt" }}>
                                            The diamond cut process
                                        </span>
                                    </h2>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Diamond cut refers to how the jeweler physically cuts the diamond stone
                                    into its shape and to the proportions and symmetry that achieve optimal
                                    light dispersion, which affects a diamond’s quality and price.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Each diamond is cut to very exacting standards. Let’s look at the process
                                    to cut a beautiful diamond to better understand the terminology the
                                    jewellery industry uses to explain diamond cut factors.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The most common cut, the&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    round brilliant
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , has 58 facets, or small, flat, polished planes designed to yield the
                                    maximum amount of light reflected back to the viewer.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    A diamond’s light reflection, known as&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    brilliance
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , is an extremely important factor in evaluating the quality of a
                                    diamond’s cut. A poorly cut diamond will actually lose light and appear
                                    dull.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The widest circumference of a diamond is known as the&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    girdle
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    . Above the girdle of a brilliant cut diamond are 32 facets plus the
                                    table, which is the largest and topmost facet. Below the girdle are 24
                                    facets plus the&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    culet
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , or point.&nbsp;
                                </span>
                            </p>
                            <ul style={{ listStyleType: "undefined", paddingLeft: '0px', marginTop: "40px", textAlign: 'center' }}>
                                <li>
                                    <strong>
                                        <u>
                                            <span
                                                style={{
                                                    fontFamily: "Arial",
                                                    fontSize: "14.0000pt",

                                                }}
                                            >
                                                Guide to diamond colour
                                            </span>
                                        </u>
                                    </strong>
                                </li>
                            </ul>
                            <p>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    Diamonds come in every color of the spectrum, but the most popular are
                                    colorless. Truly&nbsp;
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    colorless
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    , pure white diamonds are extremely rare and, therefore, the most costly.
                                    Laboratories, like the gemological institute of america (gia), grade
                                    stones according to how far they deviate from the purest white as one of
                                    the diamond 4cs.
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span style={{ fontFamily: "Arial", fontSize: 16 }}>
                                    <br />
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Arial",
                                        fontSize: 16,

                                    }}
                                >
                                    The best way to see the true color of a diamond is by looking at it
                                    against a white surface. Colorless stones are graded d, e or f. All three
                                    grades are considered colorless but with slightly decreasing transparency.
                                    Color grading continues down through the alphabet, with each letter
                                    designating a slight darker or warmer tint.
                                </span>
                            </p>
                            <p style={{ marginTop: "5.0000pt", marginBottom: "5.0000pt" }}>
                                <em>
                                    <span style={{ fontFamily: "Arial", fontSize: 16 }}>&nbsp;</span>
                                </em>
                            </p>
                            <p style={{ marginTop: "5.0000pt", marginBottom: "5.0000pt" }}>
                                <em>
                                    <span style={{ fontFamily: "Arial", fontSize: 16 }}>&nbsp;</span>
                                </em>
                            </p>
                        </div>

                        <Footer />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' ,backgroundColor:"#C0BBB1" ,color:"white" }}>
                    <p style={{ margin: '0px', fontWeight: 500, width: '100px',  cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
                </div>
            </div>
        </div>
    )
}
