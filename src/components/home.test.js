// subject:

import home from '@/components/home.vue';



// dependencies:

import weather from '@/services/weather';



// mocks:

jest.mock('@/services/weather');



// wrapper:

function createWrapper() {
  const wrapper = shallow(home, {});

  return wrapper;
}



// tests:

describe('components - home', () => {
  let wrapper;

  beforeEach(() => {
    weather.current.mockClear();

    wrapper = createWrapper();
  });

  test('correctly named', () => {
    expect(home.name).toEqual('Home');
  });

  test('defaults model values', () => {
    expect(home.data().subtitle).toEqual('Time to get to work...');
    expect(home.data().weather).toEqual({
      temperature: 0,
      description: null
    });
    expect(home.data().weatherIsLoading).toEqual(false);
    expect(home.data().weatherFailedToLoad).toEqual(false);
  });

  test('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });



  describe('created()', () => {
    const loadCurrentWeather = home.methods.loadCurrentWeather;

    beforeEach(() => {
      home.methods.loadCurrentWeather = jest.fn();

      wrapper = createWrapper();
    });

    test('calls loadCurrentWeather()', () => {
      expect(home.methods.loadCurrentWeather).toHaveBeenCalled();
    });

    afterEach(() => {
      home.methods.loadCurrentWeather = loadCurrentWeather;
    });
  });



  describe('methods.loadCurrentWeather()', () => {
    beforeEach(() => {
      wrapper.vm.weatherIsLoading = false;
      wrapper.vm.weatherFailedToLoad = true;

      wrapper.vm.loadCurrentWeather();
    });

    test('sets weatherIsLoading to true', () => {
      expect(wrapper.vm.weatherIsLoading).toEqual(true);
    });

    test('sets weatherFailedToLoad to false', () => {
      expect(wrapper.vm.weatherFailedToLoad).toEqual(false);
    });

    test('requests current weather', () => {
      expect(weather.current).toHaveBeenCalled();
    });

    describe('when request succeeds', () => {
      beforeEach(() => {
        weather.current.mockResolvedValue({
          main: {
            temp: 72
          },
          weather: [
            {
              description: 'cloudy with a chance of meatballs'
            }
          ]
        });

        return wrapper.vm.loadCurrentWeather();
      });

      test('sets weatherIsLoading to false', () => {
        expect(wrapper.vm.weatherIsLoading).toEqual(false);
      });

      test('keeps weatherFailedToLoad set to false', () => {
        expect(wrapper.vm.weatherFailedToLoad).toEqual(false);
      });
    });

    describe('when request fails', () => {
      beforeEach(() => {
        weather.current.mockRejectedValue();

        return wrapper.vm.loadCurrentWeather();
      });

      test('sets weatherIsLoading to false', () => {
        expect(wrapper.vm.weatherIsLoading).toEqual(false);
      });

      test('sets weatherFailedToLoad to true', () => {
        expect(wrapper.vm.weatherFailedToLoad).toEqual(true);
      });
    });
  });
});
