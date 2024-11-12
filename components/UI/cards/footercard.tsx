import Image, { StaticImageData } from "next/image"

type FooterCardProps = {
  label: string
  value: string
  image: StaticImageData
  href?: string
}

const FooterCard = ({ label, value, image }: FooterCardProps) => {
  return (
    <div className="relative p-2">
      <div className="flex flex-row gap-6 items-center">
        <Image src={image} width={30} height={30} alt="Icon" />
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold font-secondary">{label}</h4>
          <span className="font-normal font-secondary">{value}</span>
        </div>
      </div>
    </div>
  )
}

export default FooterCard