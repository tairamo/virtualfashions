import Link from "next/link";

export const FooterLinkWidget = (props) => {
  const { title, link, useLink, className } = props;

  let properties = {
    className: `w-max font-semibold no-underline text-brand-black leading-1.4 transition-colors duration-500 ease-trans-expo hover:text-brand-888 cursor-pointer ${className}`,
  };

  if (props.href) {
    properties.href = props.href;
  }

  if (useLink) {
    return (
      <Link href={link} passHref>
        <a className={properties.className}>{title}</a>
      </Link>
    );
  }

  return <a {...properties}>{title}</a>;
};
