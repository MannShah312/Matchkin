// import { Icon } from "@iconify/react";

// const steps = [
//   {
//     icon: "mdi:clipboard-text-outline",
//     title: "Post Your Project",
//     description: "Share your project requirements in a few simple steps."
//   },
//   {
//     icon: "mdi:account-search",
//     title: "Smart Match Engine",
//     description: "Find consultants with a closest skill match."
//   },
//   {
//     icon: "mdi:handshake-outline",
//     title: "Connect & Collaborate",
//     description: "Start a conversation or jump into chat and kick off your project."
//   }
// ];

// const HowItWorks = () => {
//   return (
//     <section className="bg-gray-100 py-16 px-6 text-center">
//       <h2 className="text-3xl font-bold mb-12">How it works</h2>
//       <div className="flex flex-col lg:flex-row justify-around items-center space-y-10 lg:space-y-0">
//         {steps.map((step, index) => (
//           <div key={index} className="w-full max-w-xs bg-white p-6 rounded-lg shadow">
//             <Icon icon={step.icon} className="text-5xl text-yellow-500 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//             <p className="text-gray-600">{step.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;


import { Icon } from "@iconify/react";

const steps = [
  {
    icon: "mdi:clipboard-text-outline",
    title: "Post Your Project",
    description: "Share your project requirements in a few simple steps."
  },
  {
    icon: "mdi:account-search",
    title: "Smart Match Engine",
    description: "Find consultants with a closest skill match."
  },
  {
    icon: "mdi:handshake-outline",
    title: "Connect & Collaborate",
    description: "Start a conversation or jump into chat and kick off your project."
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-12">How it works</h2>
      <div className="flex flex-col lg:flex-row justify-around items-center space-y-10 lg:space-y-0">
        {steps.map((step, index) => (
          <div
            key={index}
            className="w-full max-w-xs bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-center mb-4">
              <Icon
                icon={step.icon}
                className="text-5xl text-yellow-500 transition-transform duration-300 hover:-translate-y-2 hover:text-yellow-600"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;