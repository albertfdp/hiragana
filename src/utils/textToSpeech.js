const textToSpeech = text => {
  if ('speechSynthesis' in window) {
    const message = new SpeechSynthesisUtterance();
    message.voiceURI = 'native';
    message.text = text;
    message.volume = 1;
    message.rate = 0.5;
    message.pitch = 1;
    message.lang = 'ja';

    window.speechSynthesis.speak(message);
  }
};

export default textToSpeech;
