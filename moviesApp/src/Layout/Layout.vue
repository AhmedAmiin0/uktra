<template>
  <VApp :theme="theme">
    <v-layout>
      <VAppBar>
        <VBtn
          icon
          @click.stop="drawer = !drawer"
          v-if="user?.role === 'admin'"
          style="margin-right: 10px"
        >
          <VIcon>mdi-menu</VIcon>
        </VBtn>
        <VBtn :to="{ name: 'Movies' }"> Home</VBtn>
        <VSpacer />

        <VBtn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          @click="onClick"
          >Toggle Theme</VBtn
        >
        <VBtn @click="logout" color="error" v-if="token != null">Logout</VBtn>
      </VAppBar>
      <VNavigationDrawer
        permanent
        v-model="drawer"
        app
        :clipped="true"
        v-if="user?.role === 'admin'"
      >
        <VList>
          <VListItem v-for="item in items" :key="item.title">
            <VListItemTitle>
              <VBtn
                :to="{ name: item.to }"
                width="100%"
                :prepend-icon="item.icon"
              >
                <span>{{ item.title }}</span>
              </VBtn>
            </VListItemTitle>
          </VListItem>
        </VList>
      </VNavigationDrawer>
      <VMain>
        <VContainer> <slot /> </VContainer>
        <VCard
          style="position: fixed; bottom: 0; right: 0; z-index: 9999"
          v-if="successMessage"
        >
          <VAlert type="success" dense text>
            {{ successMessage }}
          </VAlert>
        </VCard>
        <VCard
          style="position: fixed; bottom: 0; right: 0; z-index: 9999"
          v-if="errorMessage"
        >
          <VAlert type="error" dense text>
            {{ errorMessage }}
          </VAlert>
        </VCard>
      </VMain>
    </v-layout>
  </VApp>
</template>
<script setup>
import useLayoutHook from "./useLayoutHook";
const {
  theme,
  onClick,
  drawer,
  items,
  user,
  logout,
  successMessage,
  errorMessage,
  token,
} = useLayoutHook();
</script>
