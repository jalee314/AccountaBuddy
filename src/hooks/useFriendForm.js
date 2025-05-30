import { useState } from 'react';
import { sendFriendRequest } from '../controllers/friendController'; // Ensure path is correct

export const useFriendForm = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => { // 'event' is passed from the form's onSubmit
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    if (!email.trim()) {
      setStatusMessage('Please enter an email address.');
      setIsLoading(false); // Ensure loading is false if we return early
      return { success: false, message: 'Please enter an email address.' }; // Return a result object
    }

    setIsLoading(true);
    setStatusMessage(''); // Clear previous messages

    const result = await sendFriendRequest(email); // This is the call to your controller

    setStatusMessage(result.message);
    if (result.success) {
      setEmail(''); // Clear email field on success
    }

    setIsLoading(false);
    return result; // Return the full result object
  };

  return {
    email,
    setEmail,
    handleSubmit,
    statusMessage,
    isLoading,
  };
};