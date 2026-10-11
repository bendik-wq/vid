// Fill these in before going live. Anything left empty is simply skipped.
window.REBUILD_CONFIG = {
  // CRM / Zapier / GoHighLevel / Make inbound webhook. Applications are POSTed form-encoded.
  leadWebhookUrl: "",

  // Booking calendar embed URL per clinic (GoHighLevel, Calendly, Cal.com, etc.).
  // "Either" applicants are shown the Melton calendar unless this is also set.
  bookingUrls: {
    Melton: "",
    Williamstown: "",
    Either: "",
  },

  // Embed URL for the sales video on the lander (e.g. https://www.youtube.com/embed/VIDEO_ID).
  vslEmbedUrl: "",

  // "Watch before your call" videos on the thank-you page.
  preCallVideos: [
    { title: "Meet your physio and how we work", embedUrl: "" },
    { title: "Tour the rehab gyms in Melton and Williamstown", embedUrl: "" },
    { title: "What happens at your Rebuild Assessment", embedUrl: "" },
  ],

  metaPixelId: "",
  ga4Id: "",

  clinicPhones: {
    Melton: "(03) 9743 4848",
    Williamstown: "(03) 9989 0106",
  },
};
