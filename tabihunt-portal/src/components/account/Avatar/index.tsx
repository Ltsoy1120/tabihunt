import Icon from "@/components/UI/Icon"
import { HunterDto } from "@/models/hunter"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import "./style.scss"

interface AvatarProps {
  me: HunterDto
  openModal: () => void
}
const Avatar = ({ me, openModal }: AvatarProps) => {
  return (
    <div className="avatar">
      {me?.imageUrl ? (
        <div className="avatar__img">
          <Image
            src={`${API_URL}files/${me.imageUrl}`}
            alt="avatar"
            width={230}
            height={230}
          />
        </div>
      ) : (
        <div className="avatar__default">
          <Image
            src={"/static/images/avatar.png"}
            alt="avatar"
            width={230}
            height={230}
          />
        </div>
      )}
      <div className="photo" onClick={() => openModal()}>
        <Icon name="photo" size={20} />
      </div>
    </div>
  )
}

export default Avatar
