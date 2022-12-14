export default function WidgetNews({ news }: any) {
  return (
    <a href={news.url} target={`_blank`}>
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{news.title}</h6>
          <p className="text-xs font-medium text-gray-500">{news.source.name}</p>
        </div>
        <img
          src={news.urlToImage}
          alt="newsImg"
          className="rounded-xl"
          width={70} 
        />
      </div>
    </a>
  )
}
