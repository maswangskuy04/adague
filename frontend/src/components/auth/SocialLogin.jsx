// Library
import { FaFacebook, FaGoogle, FaVk } from "react-icons/fa"

function SocialLogin({ onLogin }) {
  const socialProviders = [
    {
      key: "facebook",
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-lg" />,
      hover: "hover:bg-gray-800",
    },
    {
      key: "google",
      name: "Google",
      icon: <FaGoogle className="text-red-500 text-lg" />,
      hover: "hover:bg-gray-800",
    },
    {
      key: "vk",
      name: "VK",
      icon: <FaVk className="text-sky-600 text-lg" />,
      hover: "hover:bg-gray-800",
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {socialProviders.map(({ key, name, icon, hover }) => (
        <button
          key={key}
          type="button"
          aria-label={`Login dengan ${name}`}
          onClick={() => onLogin?.(key)}
          className={`flex items-center gap-3 w-full py-2 px-4 border border-gray-400 rounded-lg transition-colors duration-200 ${hover}`}
        >
          <div className="flex-shrink-0">{icon}</div>
          <span className="flex-1 text-slate-200 font-medium">
            Continue with {name}
          </span>
        </button>
      ))}
    </div>
  )
}

export default SocialLogin
