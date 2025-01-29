import Icon from "../../../../components/UI/Icon"
import { getHuntsmanFullName } from "../../../../helpers/common"
import { MembershipDto } from "../../../../models/memberships"
import "./style.scss"

interface MembershipsListProps {
  memberships: MembershipDto[]
  selectedYear: string | null
  selectedMembership?: MembershipDto
  handleClick: (membership: MembershipDto) => void
}

const MembershipsList = ({
  memberships,
  selectedYear,
  selectedMembership,
  handleClick
}: MembershipsListProps) => {
  return (
    <div className="memberships-list">
      {memberships.length > 0 ? (
        memberships.map(membership => (
          <div
            key={membership.id}
            className="memberships-list__item"
            onClick={() => handleClick(membership)}
          >
            <div className="memberships-list__item-info">
              <p
                className={
                  selectedMembership?.id === membership.id ? "active" : ""
                }
              >
                {getHuntsmanFullName(membership.hunter)}
              </p>
              <div className="row">
                <span>ИИН: {membership.hunter.iin}</span>
              </div>
            </div>

            <Icon name="arrow-right" size={16} />
          </div>
        ))
      ) : (
        <p>За {selectedYear} год членов нет</p>
      )}
    </div>
  )
}

export default MembershipsList
