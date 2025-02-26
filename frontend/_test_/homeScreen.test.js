import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen'; 

// Mock navigation prop
const mockNavigation = {
  replace: jest.fn(),
};

describe('HomeScreen Component', () => {
  it('renders correctly with default text', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    
    
    expect(getByText('🎉 Congratulations! 🎉')).toBeTruthy();
    
    
    expect(getByText('You have successfully logged in.')).toBeTruthy();
  });

  it('calls logout function and navigates to SignIn', async () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    const logoutButton = getByText('Logout');
    
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith('SignIn');
    });
  });
});
