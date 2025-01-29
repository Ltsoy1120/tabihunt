import { groupWorkingHours } from "../../../../helpers/common"
import { HuntingSocietyData } from "../../../../models/huntingSociety"
import { API_URL } from "../../../../services/http.service"
import "./style.scss"



const AboutHuntingSocietyCard = (props:{data:HuntingSocietyData}) => {
    return (
        <div className="HuntingSociety">
            <div className="mainInfoHuntingSociety">
                <div className="mainInfoHuntingSocietyImage">
                    <img src={`${API_URL}files/${props.data.imageUrl}`} alt="image" />
                </div>
                <div className="aboutInfo">
                    <h2>
                        О нас
                    </h2>
                    <div className="aboutTextInfo">
                        <div className={"aboutTextInfo-card"}>
                        <span>Русский</span>
                        {
                            props.data.aboutTranslations[0].about ===""?"":<p>
                            <div dangerouslySetInnerHTML={{__html: props.data.aboutTranslations[0].about}} />
                        </p>
                        }
                        </div>
                        <div className={"aboutTextInfo-card"}>
                        <span>Казахский</span>
                        {
                            props.data.aboutTranslations[1].about ===""?"":<p>
                            <div dangerouslySetInnerHTML={{__html: props.data.aboutTranslations[1].about}} />
                        </p>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className={"instructionsHuntingSociety"}>
                <h3>Как стать членом?</h3>
                <div className="instructionsHuntingSociety-card">
                    <span>Русский</span>
                    {
                        props.data.instructionsTranslations[0].instructions === ""?"":
                        <p>
                             <div dangerouslySetInnerHTML={{__html: props.data.instructionsTranslations[0].instructions}} />
                        </p>
                    }
                </div>
                    <div className="instructionsHuntingSociety-card">
                        <span>Казахский</span>
                        {
                        props.data.instructionsTranslations[1].instructions === ""?"":
                        <p>
                            <div dangerouslySetInnerHTML={{__html: props.data.instructionsTranslations[1].instructions}} />
                        </p>
                    }
                    </div>
            </div>
            <div className="contactHuntingSociety">
                <h2>
                    Контакты
                </h2>
                <p>Мы всегда рады новым членам и партнёрам. Свяжитесь с нами</p>
                <div className="contactCardHuntingSociety">
                    <div className="infocard">
                        <div className="contactCardHuntingSociety-item">
                            <img src="/static/images/email.png" alt="email-icon" />
                            <p>{props.data.email}</p>
                        </div>
                        
                        <div className="location contactCardHuntingSociety-item">
                            <img src="/static/images/location.png" alt="location-icon" />
                            <p>{props.data.address}</p>
                        </div>
                    </div>
                    <div className="infocard">
                        <div className="contactCardHuntingSociety-item">
                            <img src="/static/images/phone.png" alt="phone-icon" />
                            <p>{props.data.phoneNumber}</p>
                        </div>
                        <div className="location contactCardHuntingSociety-item">
                                <div className="location-clock">
                                    {props.data && groupWorkingHours(props.data.workingHours).split(", ").map((item, index) => <p key={index}>{item}</p>)}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default AboutHuntingSocietyCard
