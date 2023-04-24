import emailjs from "@emailjs/browser";
import EMAIL_JS_CONFIG from "../../config/mail";

export const sendMailWithFile = (templatePramsNew) => {
  let templateParams = {
    ...EMAIL_JS_CONFIG.templateParams,
    ...templatePramsNew,
  };
  return emailjs.send(
    EMAIL_JS_CONFIG.serviceID,
    EMAIL_JS_CONFIG.templateID,
    templateParams,
    EMAIL_JS_CONFIG.publicKey
  );
};

export const sendMailWithTasks = (templatePramsNew) => {
  let newTemplateId = 'template_v8r7nxu';
  let templateParams = {
    ...EMAIL_JS_CONFIG.templateParams,
    ...templatePramsNew,
  };

  return emailjs.send(
    EMAIL_JS_CONFIG.serviceID,
    newTemplateId,
    templateParams,
    EMAIL_JS_CONFIG.publicKey
  );
};