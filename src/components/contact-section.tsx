import { contactMethods } from "@/lib/config/contact-methods";

export const ContactSection = () => {
  return (
    <section className="py-12 pb-28 max-w-screen-xl mx-auto px-4 gap-12 md:px-8 lg:flex">
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-3xl font-semibold sm:text-4xl">Let’s connect</h3>
        <p className="mt-3">
          We’re here to help and answer any question you might have, We look
          forward to hearing from you .
        </p>
      </div>
      <div>
        <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
          {contactMethods.map((item, idx) => (
            <li
              key={idx}
              className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
            >
              <div className="w-12 h-12 rounded-full border flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="text-lg font-medium xl:text-xl">{item.title}</h4>
              <p>{item.desc}</p>
              <a
                href={item.link.href}
                className="flex items-center gap-1 text-sm duration-150 font-medium"
              >
                {item.link.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
