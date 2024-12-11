import "./management-team.scss";
import { FaStar } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { storImagePath } from "./../../../../../../utils/Glob_Functions/GlobalFunction";

export default function ManagementTeam() {
  return (
    <>
      <main className="vara_ManagementTeam">
        <Banner />
        <DirectorInfo />
        <MemberList/>
      </main>
    </>
  );
}

const Banner = ({ title = "MANAGEMENT TEAM" }) => {
  const Image = `url(${
    storImagePath() + "/images/management-team-banner.png"
  })`;
  return (
    <>
      <div
        className="vara_banner_title"
        style={{
          backgroundImage: Image,
        }}
      >
        <h1>{title}</h1>
      </div>
    </>
  );
};

const DirectorInfo = () => {
  return (
    <>
      <div className="vara_director_info">
        <div className="vara_sec_1"></div>
        <div className="vara_sec_2">
          <div className="mb_vara_sec">
            <div className="sec">
              <div className="iamge_vara">
                <img
                  src={storImagePath() + `/images/management-team/1.png`}
                  alt=""
                />
              </div>
              <div className="details_vara_abs">
                <span className="vara_title">Divyesh Mavani</span>
                <div className="line_vara"></div>
                <small className="vara_sub_titlte">Founder & CEO</small>
              </div>
            </div>
            <div className="sec">
            <div className="iamge_vara">
            <img
              src={storImagePath() + `/images/management-team/2.png`}
              alt=""
            />
              </div>
              <div className="details_vara_abs">
              <span className="vara_title">Keval Mavani</span>
              <div className="line_vara"></div>
              <small className="vara_sub_titlte">Director</small>
              </div>
            </div>
          </div>
          <div className="vara_box_1">
            <img
              src={storImagePath() + `/images/management-team/1.png`}
              alt=""
            />
            <div className="details_vara_abs">
              <span className="vara_title">Divyesh Mavani</span>
              <div className="line_vara"></div>
              <small className="vara_sub_titlte">Founder & CEO</small>
            </div>
          </div>
          <div className="vara_box_2">
            <img
              src={storImagePath() + `/images/management-team/2.png`}
              alt=""
            />
            <div className="details_vara_abs">
              <span className="vara_title">Keval Mavani</span>
              <div className="line_vara"></div>
              <small className="vara_sub_titlte">Director</small>
            </div>
          </div>
        </div>
        <div className="vara_sec_3">
          <div className="details">
            <h1 className="vara_title_main">Creative Visionaries</h1>
            <p className="vara_Desc">
              Meet the visionary minds behind the magic at Vara Jewels. Our
              Creative Directors are the heartbeat of our design process,
              infusing every piece with artistry, innovation, and a deep
              understanding of your desires. Get to know the talented
              individuals who bring our jewelry to life and share in their
              passion for crafting the extraordinary.
            </p>
            <h2 className="vara_sub_head">
              The Genius Behind The Gems: Our Pioneering Directors
            </h2>
          </div>
          <div>
            <div className="vara_icon">
              {/* Vision */}
              <div className="icon_Div_vara">
                <div className="icon_img_vara">
                  <img src={storImagePath() + `/images/icon/1.png`} alt="" />
                </div>
                <h3 className="icon_title">Vision</h3>
              </div>

              {/* Mission */}
              <div className="icon_Div_vara">
                <div className="icon_img_vara">
                  <img src={storImagePath() + `/images/icon/2.png`} alt="" />
                </div>
                <h3 className="icon_title">Mission</h3>
              </div>
              {/* Value */}
              <div className="icon_Div_vara">
                <div className="icon_img_vara">
                  <img src={storImagePath() + `/images/icon/3.png`} alt="" />
                </div>
                <h3 className="icon_title">Value</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MemberList = ()=>{
  const teamMembers = [
    {
      name: 'Jaykishan Bhalala',
      role: 'Managing director',
      image: `${storImagePath()}/images/management-team/4.png`
    },
    {
      name: 'Yogesh Kukadiya',
      role: 'Marketing (Head)',
      image: `${storImagePath()}/images/management-team/5.png`
    },
    {
      name: 'Anil Gujrati',
      role: 'Production (Head)',
      image: `${storImagePath()}/images/management-team/6.png`
    },
    {
      name: 'Ankita Panseriya',
      role: 'Sales (Head)',
      image: `${storImagePath()}/images/management-team/7.png`
    },
    {
      name: 'Jitesh Dudhatra',
      role: 'Accounts (Head)',
      image: `${storImagePath()}/images/management-team/8.png`
    },
    {
      name: 'Jaydip Talaviya',
      role: 'Product Development (Head)',
      image: `${storImagePath()}/images/management-team/9.png`
    }
  ]
  return <>
  <main className="vaara-main">
        <div className="vaara-content">
          <h1 className="vaara-title">Strategic Team</h1>
          <p className="vaara-subtitle">
            Meet The Architects Of Our Success –<br />
            The Leaders At Vara Jewels, Where<br />
            Vision Meets Execution.
          </p>
          </div>

          <div className="vaara-team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="vaara-team-member">
                <div className="vaara-image-container">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={400}
                    className="vaara-member-image"
                  />
                </div>
                <div className="vaara-member-info">
                  <span className="vaara-member-name">{member.name}</span>
                  <p className="vaara-member-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
      </main>
  </>
}