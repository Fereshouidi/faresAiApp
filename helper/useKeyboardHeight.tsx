import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onKeyboardDidShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onKeyboardDidHide = () => {
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardHeight;
