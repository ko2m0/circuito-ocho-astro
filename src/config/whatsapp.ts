export const WHATSAPP = {

    number: "5217701540400",
    
    defaultMessage: "Hola, quiero agendar una consultoría de marketing digital.",
    
    // A helper function to generate the URL dynamically
    getUrl: (customMessage?: string) => {
      const message = customMessage || "Hola, quiero agendar una consultoría de marketing digital.";
      return `https://wa.me/5217701540400?text=${encodeURIComponent(message)}`;
    }
  }  as const;