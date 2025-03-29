import { Card, CardHeader, CardBody } from "@nextui-org/react"
import { FaCoins, FaArrowUp, FaArrowDown } from "react-icons/fa"

export default function HumanityCoinCard({ transaction }) {
  const isIncoming = transaction.type === "incoming"

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${isIncoming ? "bg-green-100" : "bg-red-100"}`}>
            {isIncoming ? <FaArrowUp className="text-green-600" /> : <FaArrowDown className="text-red-600" />}
          </div>
          <div>
            <h3 className="text-lg font-bold">{isIncoming ? "Earned" : "Spent"} Coins</h3>
            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <FaCoins className={isIncoming ? "text-green-600" : "text-red-600"} />
          <span className={`font-bold ${isIncoming ? "text-green-600" : "text-red-600"}`}>
            {isIncoming ? "+" : "-"}
            {transaction.amount}
          </span>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <p className="text-gray-600">{transaction.description}</p>
      </CardBody>
    </Card>
  )
}

