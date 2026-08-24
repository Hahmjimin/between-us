function HeartSilhouette() {
  return (
    <div className="girl-scene-v2">
      <div className="girl-aura-v2" />

      <svg
        className="girl-svg-v2"
        viewBox="0 0 420 560"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="girlBodyV2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#160b1c" />
            <stop offset="55%" stopColor="#08040c" />
            <stop offset="100%" stopColor="#020103" />
          </linearGradient>

          <filter id="girlGlowV2">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="
            M126 238
            C95 184 104 107 151 63
            C192 24 256 18 303 45
            C352 73 369 130 352 185
            C341 217 318 240 311 276
            C306 310 324 354 347 402
            C366 445 378 497 381 544
            L73 544
            C77 489 91 443 108 399
            C128 348 139 290 126 238
          "
          fill="url(#girlBodyV2)"
        />

        <path
          d="
            M174 118
            C179 80 208 58 241 60
            C270 62 292 79 303 103
            C309 117 308 136 300 149
            C291 163 279 173 265 179
            L246 186
            C244 203 248 219 258 233
            L199 233
            C208 214 207 195 201 181
            C180 170 169 145 174 118
          "
          fill="#0b060e"
        />

        <path
          d="
            M169 125
            C166 81 196 43 240 44
            C281 44 310 71 313 107
            C290 89 269 82 251 77
            C234 98 208 115 169 125
          "
          fill="#020103"
        />

        <path
          d="
            M170 104
            C134 150 129 205 143 253
            C157 305 133 359 113 414
          "
          fill="none"
          stroke="#020103"
          strokeWidth="55"
          strokeLinecap="round"
        />

        <path
          d="
            M303 86
            C341 125 348 176 333 221
            C315 275 329 336 355 393
          "
          fill="none"
          stroke="#020103"
          strokeWidth="53"
          strokeLinecap="round"
        />

        <path
          d="
            M199 222
            C162 247 135 278 118 320
            C99 366 85 438 75 544
            L381 544
            C371 440 355 368 335 324
            C315 279 285 248 256 224
            C240 238 216 238 199 222
          "
          fill="url(#girlBodyV2)"
        />

        <path
          className="girl-outline-v2"
          d="
            M127 238
            C97 183 105 108 152 64
            C192 27 255 20 302 47
            C349 74 366 129 351 183
          "
          fill="none"
          stroke="#e45ca4"
          strokeWidth="2"
          opacity="0.42"
          filter="url(#girlGlowV2)"
        />
      </svg>

      <div className="girl-ecg-v2">
        <span className="girl-ecg-line-v2" />

        <svg
          className="girl-ecg-wave-v2"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,20 20,20 28,19 34,29 41,5 48,35 56,14 63,20 100,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <span className="girl-ecg-line-v2 girl-ecg-line-right-v2" />
      </div>

      <div className="girl-heart-area-v2">
        <span className="girl-heart-ring-v2 ring-v2-1" />
        <span className="girl-heart-ring-v2 ring-v2-2" />

        <div className="girl-heart-v2">
          <span>♥</span>
        </div>
      </div>

      <span className="girl-particle-v2 particle-v2-1">✦</span>
      <span className="girl-particle-v2 particle-v2-2">✦</span>
      <span className="girl-particle-v2 particle-v2-3">·</span>
      <span className="girl-particle-v2 particle-v2-4">✦</span>
    </div>
  )
}

export default HeartSilhouette