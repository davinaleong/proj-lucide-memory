import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default-value')
    );

    expect(result.current[0]).toBe('default-value');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key');
  });

  it('should return parsed value from localStorage', () => {
    const testData = { name: 'test', value: 42 };
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(testData));
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', {})
    );

    expect(result.current[0]).toEqual(testData);
  });

  it('should save value to localStorage when setValue is called', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
    expect(result.current[0]).toBe('new-value');
  });

  it('should support function updates', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(5));
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 0)
    );

    act(() => {
      result.current[1](prevValue => prevValue + 10);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify(15)
    );
    expect(result.current[0]).toBe(15);
  });

  it('should handle localStorage errors gracefully', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    // Should not throw and should use initial value
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'fallback')
    );

    expect(result.current[0]).toBe('fallback');
  });

  it('should handle JSON parse errors gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid json');
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default')
    );

    expect(result.current[0]).toBe('default');
  });

  it('should handle localStorage setItem errors', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    // Should not throw when trying to save
    act(() => {
      result.current[1]('new-value');
    });

    // Value should still be updated in state
    expect(result.current[0]).toBe('new-value');
  });

  it('should work with different data types', () => {
    const testCases = [
      { initial: true, new: false },
      { initial: 42, new: 100 },
      { initial: [], new: [1, 2, 3] },
      { initial: {}, new: { key: 'value' } },
      { initial: null, new: 'not null' },
    ];

    testCases.forEach(({ initial, new: newValue }, index) => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const { result } = renderHook(() => 
        useLocalStorage(`test-key-${index}`, initial)
      );

      act(() => {
        result.current[1](newValue);
      });

      expect(result.current[0]).toEqual(newValue);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        `test-key-${index}`,
        JSON.stringify(newValue)
      );
    });
  });
});