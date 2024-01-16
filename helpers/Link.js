import Link from "next/link";

const LinkComponent = ({
                         href,
                         children,
                         skipLocaleHandling,
                         className,
                         ...rest
                       }) => {
  // const router = useRouter()
  // const locale = rest.locale || router.query.locale || ""
  //
  // let href = rest.href || router.asPath
  // if (href.indexOf("http") === 0) skipLocaleHandling = true
  // if (locale && !skipLocaleHandling) {
  //     href = href ? `/${locale}${href}` : router.pathname.replace("[locale]", locale)
  // }
  return (
    <Link className={className} href={href} {...rest} legacyBehavior>
      {children}
    </Link>
  );
};

export default LinkComponent;
