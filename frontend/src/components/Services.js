const services = [
  {
    title: "Expert Matching",
    description: "Connect with consultants tailored to your project needs, industry, and expertise requirements.",
  },
  {
    title: "Project Scoping",
    description: "Define goals, deliverables, and timelines clearly with support from experienced professionals.",
  },
  {
    title: "On-Demand Consulting",
    description: "Access consultants for short-term tasks or urgent challenges without long-term commitments.",
  },
  {
    title: "Performance Monitoring",
    description: "Track consultant progress and quality with built-in review and reporting tools.",
  },
  {
    title: "Seamless Collaboration",
    description: "Use integrated tools for messaging, file sharing, and scheduling to streamline your workflow.",
  },
  {
  title: "Verified Expertise",
  description: "Work with consultants vetted for their credentials, experience, and client success history.",
}
];
const Services = () => {
  return (
    // <section className="bg-blue-900 text-white py-16 px-6 text-center">
    //   <h2 className="text-3xl font-extrabold mb-12">Our Services</h2>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    //     {services.map((service, index) => (
    //       <div key={index} className="bg-blue-800 rounded-lg p-6 shadow">
    //         <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
    //         <p className="text-gray-300">{service.description}</p>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <section className="bg-blue-900 text-white py-16 px-6 text-center">
  <h2 className="text-3xl font-extrabold mb-12">Our Services</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {services.map((service, index) => (
      <div
        key={index}
        className="bg-blue-800 rounded-lg p-6 shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:bg-blue-700"
      >
        <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-300">{service.description}</p>
      </div>
    ))}
  </div>
</section>
  );
};
export default Services;