import TawkMessengerVue from "@tawk.to/tawk-messenger-vue-3";

export default {
  install(app) {
    app.use(TawkMessengerVue, {
      propertyId: import.meta.env.VITE_TAWK_PROPERTY_ID,
      widgetId: import.meta.env.VITE_TAWK_WIDGET_ID,
    });
  },
};
