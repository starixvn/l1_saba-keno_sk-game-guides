FROM hub.lumigame.com/pentagon-base/sk-game-guide-base:20.9.0-alpine-npm-cache-latest AS deps
FROM hub.lumigame.com/base/node:20.9.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock tsconfig.json configs.json game-settings.json next.config.js next-i18next.config.js ./
RUN yarn install --frozen-lockfile --verbose
COPY configs ./configs
COPY public ./public
COPY src ./src

RUN yarn build

FROM hub.lumigame.com/base/node:20.9.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs  \
     && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next  \
     && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 5000
ENV PORT 5000
CMD HOSTNAME="0.0.0.0" node server.js
