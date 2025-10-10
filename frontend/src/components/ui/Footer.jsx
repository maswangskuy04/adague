import { format } from "date-fns"
import { id } from "date-fns/locale"

function Footer() {

  return (
    <div className="bottom-0 left-0 w-full bg-gradient-to-r from-blue-300/20 to-yellow-300/20 p-3">
      <p className="text-center text-slate-600 font-medium text-sm">&copy; AdaGue {format(new Date(), 'yyyy', { locale: id })}. Made with ❤ for everyone.</p>
    </div>
  )
}

export default Footer