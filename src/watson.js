window.watsonAssistantChatOptions = {
    integrationID: "ba0ea13f-3096-4ff7-8c91-2b4148b6bf28", // The ID of this integration.
    region: "au-syd", // The region your integration is hosted in.
    serviceInstanceID: "6372a42f-a7a5-40df-9675-631b3c58c3fd", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });