FROM node:lts-alpine AS base
RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY .env.prd .env

ARG NEXT_PUBLIC_API_ENDPOINT
RUN sh create-env-file.sh NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT

RUN yarn build

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV APP_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system nextjs 1001
RUN chown -R nextjs:nodejs /app/.next

USER nextjs
EXPOSE 3000
CMD ["yarn","start"]