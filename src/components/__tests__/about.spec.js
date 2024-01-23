import AboutViewVue from "@/views/AboutView.vue"
import { describe, expect, test } from "vitest"
import { shallowMount } from '@vue/test-utils'

describe('About.vue', () => {
    test('renders the inner text', () => {
        const wrapper = shallowMount(AboutViewVue)
        expect(wrapper.text()).toContain('about')
    })
})