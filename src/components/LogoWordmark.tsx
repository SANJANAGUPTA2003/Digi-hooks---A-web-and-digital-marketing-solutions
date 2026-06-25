type LogoWordmarkProps = {
  className?: string
}

export function LogoWordmark({ className = '' }: LogoWordmarkProps) {
  return (
    <span className={`inline-flex max-w-[9rem] items-center overflow-hidden sm:max-w-[10.5rem] ${className}`}>
      <img
        src="/logo.svg"
        alt="DigiHooks"
        className="block h-full w-auto max-w-full object-contain object-left"
        draggable={false}
      />
    </span>
  )
}
