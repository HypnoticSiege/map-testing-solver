import openai from "./openai";
import utils from "./utils";

console.clear()
console.log('MAP Testing Solver');

let question = `
    <p>A vendor sells <span class="hidden mathDescription">75</span><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="2.325ex" height="2.176ex" style="vertical-align: -0.338ex;" viewBox="0 -791.3 1001 936.9" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg"> <g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"> <path stroke-width="1" d="M449 646l-212 -654h-65l198 596h-215c-58 0 -75 -14 -117 -82l-18 9l60 147h369v-16Z"></path> <path stroke-width="1" d="M438 681l-36 -85c-3 -7 -11 -13 -27 -13h-194l-40 -85c143 -27 193 -49 250 -128c26 -36 35 -74 35 -127c0 -96 -30 -158 -98 -208c-47 -34 -102 -49 -170 -49c-75 0 -127 24 -127 62c0 25 17 38 45 38c23 0 42 -5 74 -31c28 -23 51 -32 71 -32c70 0 135 83 135 169 c0 64 -22 114 -67 150c-47 38 -117 70 -213 70c-9 0 -12 2 -12 8c0 2 1 5 1 5l109 237h207c23 0 32 5 48 26Z" transform="translate(500,0)"></path> </g> </svg> T-shirts at an event. Each T-shirt costs the vendor <span class="hidden mathDescription">$5.50</span><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="5.619ex" height="2.509ex" style="vertical-align: -0.505ex;" viewBox="0 -863.1 2419.2 1080.4" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg"> <g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"> <path stroke-width="1" d="M264 637v-246c121 -65 146 -90 173 -131c14 -21 21 -53 21 -90c0 -116 -79 -154 -194 -170v-87h-34v87c-87 0 -131 14 -186 51v130h15c21 -100 83 -153 171 -153v282c-138 78 -178 119 -178 203c0 100 85 145 178 151v63h34v-63c81 -5 130 -22 161 -53v-111h-15 c-20 83 -66 127 -146 137zM230 407v230c-71 -14 -104 -54 -104 -105c0 -44 20 -68 104 -125zM264 293v-265c81 17 114 48 114 119c0 61 -23 92 -114 146Z"></path> <g transform="translate(500,0)"> <path stroke-width="1" d="M438 681l-36 -85c-3 -7 -11 -13 -27 -13h-194l-40 -85c143 -27 193 -49 250 -128c26 -36 35 -74 35 -127c0 -96 -30 -158 -98 -208c-47 -34 -102 -49 -170 -49c-75 0 -127 24 -127 62c0 25 17 38 45 38c23 0 42 -5 74 -31c28 -23 51 -32 71 -32c70 0 135 83 135 169 c0 64 -22 114 -67 150c-47 38 -117 70 -213 70c-9 0 -12 2 -12 8c0 2 1 5 1 5l109 237h207c23 0 32 5 48 26Z"></path> </g> <g transform="translate(1001,0)"> <path stroke-width="1" d="M181 43c0 -29 -26 -54 -56 -54c-31 0 -55 24 -55 55s25 56 56 56c29 0 55 -27 55 -57Z"></path> </g> <g transform="translate(1418,0)"> <path stroke-width="1" d="M438 681l-36 -85c-3 -7 -11 -13 -27 -13h-194l-40 -85c143 -27 193 -49 250 -128c26 -36 35 -74 35 -127c0 -96 -30 -158 -98 -208c-47 -34 -102 -49 -170 -49c-75 0 -127 24 -127 62c0 25 17 38 45 38c23 0 42 -5 74 -31c28 -23 51 -32 71 -32c70 0 135 83 135 169 c0 64 -22 114 -67 150c-47 38 -117 70 -213 70c-9 0 -12 2 -12 8c0 2 1 5 1 5l109 237h207c23 0 32 5 48 26Z"></path> <path stroke-width="1" d="M476 330c0 -172 -63 -344 -226 -344c-171 0 -226 186 -226 350c0 177 69 340 230 340c131 0 222 -141 222 -346zM380 325c0 208 -44 325 -132 325c-83 0 -128 -118 -128 -321s44 -317 130 -317c85 0 130 115 130 313Z" transform="translate(500,0)"></path> </g> </g> </svg> to produce and each T-shirt is sold for the same price. After her expenses to produce the T-shirts, the vendor earned a profit of <span class="hidden mathDescription">$900</span><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="4.65ex" height="2.509ex" style="vertical-align: -0.505ex;" viewBox="0 -863.1 2002 1080.4" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg"> <g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"> <path stroke-width="1" d="M264 637v-246c121 -65 146 -90 173 -131c14 -21 21 -53 21 -90c0 -116 -79 -154 -194 -170v-87h-34v87c-87 0 -131 14 -186 51v130h15c21 -100 83 -153 171 -153v282c-138 78 -178 119 -178 203c0 100 85 145 178 151v63h34v-63c81 -5 130 -22 161 -53v-111h-15 c-20 83 -66 127 -146 137zM230 407v230c-71 -14 -104 -54 -104 -105c0 -44 20 -68 104 -125zM264 293v-265c81 17 114 48 114 119c0 61 -23 92 -114 146Z"></path> <g transform="translate(500,0)"> <path stroke-width="1" d="M59 -22l-3 20c152 27 264 132 304 296c-43 -42 -91 -57 -150 -57c-108 0 -180 81 -180 203c0 135 89 236 208 236c64 0 118 -28 157 -76c40 -50 64 -122 64 -206c0 -115 -40 -224 -120 -297c-85 -77 -150 -101 -280 -119zM362 355v39c0 168 -45 254 -132 254 c-30 0 -56 -12 -73 -34c-20 -27 -35 -86 -35 -140c0 -119 48 -194 123 -194c44 0 117 22 117 75Z"></path> <path stroke-width="1" d="M476 330c0 -172 -63 -344 -226 -344c-171 0 -226 186 -226 350c0 177 69 340 230 340c131 0 222 -141 222 -346zM380 325c0 208 -44 325 -132 325c-83 0 -128 -118 -128 -321s44 -317 130 -317c85 0 130 115 130 313Z" transform="translate(500,0)"></path> <path stroke-width="1" d="M476 330c0 -172 -63 -344 -226 -344c-171 0 -226 186 -226 350c0 177 69 340 230 340c131 0 222 -141 222 -346zM380 325c0 208 -44 325 -132 325c-83 0 -128 -118 -128 -321s44 -317 130 -317c85 0 130 115 130 313Z" transform="translate(1001,0)"></path> </g> </g> </svg>. </p>
`

console.log(utils.stripHTML(question));
    
console.log('All Done!')