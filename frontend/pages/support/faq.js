/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const faqs = [
  {
    question: "What does NFT stand for?",
    answer: "Non-Fungible Token.",
  },

  {
    question: "What is a Non-Fungible Token?",
    answer:
      "Fungible means they can be exchanged for one another if they hold the same value, like crypto. Non-fungible basically means that your digital assets (NFT) can not be replaced. Their unique information is stored in smart contracts on the blockchain.",
  },

  {
    question: "How do NFTs work?",
    answer:
      "Blockchain enables the authentication of an NFT's unique identity and ownership. NFTs were first supported by the Ethereum blockchain, but are now supported by other blockchains. Just like physical art, the price of the original file is largely determined by market demand, regardless of whether it is a JPG, MP3, GIF etc. Something important to note though, is that buying an NFT does not automatically guarantee copyright ownership even if the digital asset comes with a license. In other words, the copyright owner may reproduce the work and the NFT buyer may not get any royalties.",
  },

  {
    question: "How do I create a Virtual Fashion account?",
    answer:
      '1. On the top right corner of the page, press the "Login" button. \n2. Click on "register here". \n3. Enter your email and click "verify email" \n4. Go to your email and open the email titled "Registration" from support@mg.virtualfashion.io. \nClick "Continue Registration". \n5. Fill out information for "Full Name" and "Password". Click "Sign Up.',
  },

  {
    question: "How do I buy a NFT?",
    answer:
      'Go to the "Market" section and click on a piece of art. From there, you can click on the bid on a piece from the "Live Auctions" or make an offer.',
  },
  {
    question: "How do I sell a NFT I purchased on virutalFashion.io?",
    answer: "You can relist the item for sale by opening an auction.",
  },
  {
    question: "How do I create a NFTs?",
    answer:
      "Click on the create button and fill out the details. Once you click create, the NFT will be reviewed by virutalFashion.io. Once it's accepted, then you will see it in your account to list for sale.",
  },
  {
    question: "How do I set-up a wallet?",
    answer: "Create a Metamask wallet metamask.io/",
  },

  {
    question: "Where can I see my NFTs?",
    answer:
      "The easiest right now is MetaMask, it links directly to your wallet and to VirtualFashion.io. However, there are many wallets and chains out there - so this is dependant on where you are buying them and on what chain. However, there are multiple startups out there now that are solving this problem. They are creating multi-chain platforms so you can view all of your NFTs in once place.",
  },

  {
    question: "What are some use cases of fashion NFTs?",
    answer:
      "They are usually linked to a specific asset, also known as a phygital. They can be used to prove the ownership of digital items to the ownership of physical assets, much like an authenticity card you would receive when buying a designer handbag. They can also be used to buy digital clothing to wear in the metaverse and/or traditional gaming.",
  },
  {
    question: "Can I use an NFT I minted on virtualfashion in OpenSea?",
    answer:
      "Yes! You just need to copy the item's contract address and use that in your OpenSea metadata.",
  },

  // More questions...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
