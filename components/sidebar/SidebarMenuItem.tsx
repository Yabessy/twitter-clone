export default function SidebarMenuItem({ text, Icon, active }: any) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start space-x-2">
      <Icon className="h-7 w-7" />
      <p className={`${active ? "font-bold" : ""} hidden xl:inline`}>{text}</p>
    </div>
  )
}
