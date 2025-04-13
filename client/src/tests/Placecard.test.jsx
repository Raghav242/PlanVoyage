import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PlaceCard from '../components/PlaceCard';

describe('PlaceCard Component', () => {
  const mockPlace = {
    properties: {
      name: 'Test Place',
      categories: ['cafe'],
      formatted: '123 Main St',
      contact: {
        phone: '123-456-7890',
        email: 'test@example.com',
      },
    },
  };

  it('renders place information correctly', () => {
    render(
      <PlaceCard
        place={mockPlace}
        selectedTrip={{ id: 1, name: 'Trip 1' }}
        onAdd={vi.fn()}
        isAdded={false}
      />
    );

    expect(screen.getByText('Test Place')).toBeInTheDocument();
    expect(screen.getByText(/cafe/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 123-456-7890/)).toBeInTheDocument();
    expect(screen.getByText(/Email: test@example.com/)).toBeInTheDocument();
  });
});
