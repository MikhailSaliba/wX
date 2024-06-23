import { fetchWeatherApi } from 'openmeteo';
	
export const wmoWeatherCodes = {
    0: "Cloud development not observed or not observable",
    1: "Clouds generally dissolving or becoming less developed",
    2: "State of sky on the whole unchanged",
    3: "Clouds generally forming or developing",
    4: "Visibility reduced by smoke, e.g. veldt or forest fires, industrial smoke or volcanic ashes",
    5: "Haze",
    6: "Widespread dust in suspension in the air, not raised by wind at or near the station at the time of observation",
    7: "Dust or sand raised by wind at or near the station at the time of observation, but no well developed dust whirl(s) or sand whirl(s), and no duststorm or sandstorm seen",
    8: "Well developed dust whirl(s) or sand whirl(s) seen at or near the station during the preceding hour or at the time of observation, but no duststorm or sandstorm",
    9: "Duststorm or sandstorm within sight at the time of observation, or at the station during the preceding hour",
    10: "Mist",
    11: "Patches of shallow fog or ice fog at the station, whether on land or sea, not deeper than about 2 metres on land or 10 metres at sea",
    12: "More or less continuous shallow fog or ice fog",
    13: "Lightning visible, no thunder heard",
    14: "Precipitation within sight, not reaching the ground or the surface of the sea",
    15: "Precipitation within sight, reaching the ground or the surface of the sea, but distant, i.e. estimated to be more than 5 km from the station",
    16: "Precipitation within sight, reaching the ground or the surface of the sea, near to, but not at the station",
    17: "Thunderstorm, but no precipitation at the time of observation",
    18: "Squalls at or within sight of the station during the preceding hour or at the time of observation",
    19: "Funnel cloud(s)",
    20: "Drizzle (not freezing) or snow grains not falling as shower(s)",
    21: "Rain (not freezing)",
    22: "Snow",
    23: "Rain and snow or ice pellets",
    24: "Freezing drizzle or freezing rain",
    25: "Shower(s) of rain",
    26: "Shower(s) of snow, or of rain and snow",
    27: "Shower(s) of hail, or of rain and hail",
    28: "Fog or ice fog",
    29: "Thunderstorm (with or without precipitation)",
    30: "Slight or moderate duststorm or sandstorm has decreased during the preceding hour",
    31: "Slight or moderate duststorm or sandstorm with no appreciable change during the preceding hour",
    32: "Slight or moderate duststorm or sandstorm has begun or has increased during the preceding hour",
    33: "Severe duststorm or sandstorm has decreased during the preceding hour",
    34: "Severe duststorm or sandstorm with no appreciable change during the preceding hour",
    35: "Severe duststorm or sandstorm has begun or has increased during the preceding hour",
    36: "Slight or moderate blowing snow generally low (below eye level)",
    37: "Heavy drifting snow",
    38: "Slight or moderate blowing snow generally high (above eye level)",
    39: "Heavy drifting snow",
    40: "Fog or ice fog at a distance at the time of observation, but not at the station during the preceding hour, the fog or ice fog extending to a level above that of the observer",
    41: "Fog or ice fog in patches",
    42: "Fog or ice fog, sky visible has become thinner during the preceding hour",
    43: "Fog or ice fog, sky invisible",
    44: "Fog or ice fog, sky visible with no appreciable change during the preceding hour",
    45: "Fog or ice fog, sky invisible",
    46: "Fog or ice fog, sky visible has begun or has become thicker during the preceding hour",
    47: "Fog or ice fog, sky invisible",
    48: "Fog, depositing rime, sky visible",
    49: "Fog, depositing rime, sky invisible",
    50: "Drizzle, not freezing, intermittent slight at time of observation",
    51: "Drizzle, not freezing, continuous slight at time of observation",
    52: "Drizzle, not freezing, intermittent moderate at time of observation",
    53: "Drizzle, not freezing, continuous moderate at time of observation",
    54: "Drizzle, not freezing, intermittent heavy (dense) at time of observation",
    55: "Drizzle, not freezing, continuous heavy (dense) at time of observation",
    56: "Drizzle, freezing, slight",
    57: "Drizzle, freezing, moderate or heavy (dense)",
    58: "Drizzle and rain, slight",
    59: "Drizzle and rain, moderate or heavy",
    60: "Rain, not freezing, intermittent slight at time of observation",
    61: "Rain, not freezing, continuous slight at time of observation",
    62: "Rain, not freezing, intermittent moderate at time of observation",
    63: "Rain, not freezing, continuous moderate at time of observation",
    64: "Rain, not freezing, intermittent heavy at time of observation",
    65: "Rain, not freezing, continuous heavy at time of observation",
    66: "Rain, freezing, slight",
    67: "Rain, freezing, moderate or heavy (dense)",
    68: "Rain or drizzle and snow, slight",
    69: "Rain or drizzle and snow, moderate or heavy",
    70: "Intermittent fall of snowflakes slight at time of observation",
    71: "Continuous fall of snowflakes slight at time of observation",
    72: "Intermittent fall of snowflakes moderate at time of observation",
    73: "Continuous fall of snowflakes moderate at time of observation",
    74: "Intermittent fall of snowflakes heavy at time of observation",
    75: "Continuous fall of snowflakes heavy at time of observation",
    76: "Diamond dust (with or without fog)",
    77: "Snow grains (with or without fog)",
    78: "Isolated star-like snow crystals (with or without fog)",
    79: "Ice pellets",
    80: "Rain shower(s), slight",
    81: "Rain shower(s), moderate or heavy",
    82: "Rain shower(s), violent",
    83: "Shower(s) of rain and snow mixed, slight",
    84: "Shower(s) of rain and snow mixed, moderate or heavy",
    85: "Snow shower(s), slight",
    86: "Snow shower(s), moderate or heavy",
    87: "Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, slight",
    88: "Shower(s) of snow pellets or small hail, with or without rain or rain and snow mixed, moderate or heavy",
    89: "Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, slight",
    90: "Shower(s) of hail, with or without rain or rain and snow mixed, not associated with thunder, moderate or heavy",
    91: "Slight rain at time of observation, thunderstorm during the preceding hour but not at time of observation",
    92: "Moderate or heavy rain at time of observation, thunderstorm during the preceding hour but not at time of observation",
    93: "Slight snow, or rain and snow mixed or hail at time of observation",
    94: "Moderate or heavy snow, or rain and snow mixed or hail at time of observation",
    95: "Thunderstorm, slight or moderate, without hail but with rain and/or snow at time of observation",
    96: "Thunderstorm, slight or moderate, with hail at time of observation",
    97: "Thunderstorm, heavy, without hail but with rain and/or snow at time of observation",
    98: "Thunderstorm combined with duststorm or sandstorm at time of observation",
    99: "Thunderstorm, heavy, with hail at time of observation"
};

const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherData(lat: number, long: number) {
    const params = {
        "latitude": lat,
        "longitude": long,
       "hourly": ["temperature_2m", "weather_code"],
	"forecast_days": 1
    };
    const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {

	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
		weatherCode: hourly.variables(1)!.valuesArray()!,
	},

};


return weatherData

}

