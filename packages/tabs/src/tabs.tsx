import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import React, { Ref, ReactNode, useMemo } from "react"
import {
  TabsProvider,
  useTab,
  useTabIndicator,
  useTabList,
  UseTabListProps,
  useTabPanel,
  useTabPanels,
  UseTabProps,
  useTabs,
  UseTabsProps,
} from "./use-tabs"

interface TabsOptions {
  /**
   * If `true`, tabs will stretch to width of the tablist.
   */
  isFitted?: boolean
  /**
   * The alignment of the tabs
   */
  align?: "start" | "end" | "center"
}

export type TabsProps = UseTabsProps &
  ThemingProps &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "children"> &
  TabsOptions & {
    children: ReactNode
  }

/**
 * Tabs
 *
 * Provides context and logic for all tabs components. It doesn't render
 * any DOM node.
 */
export const Tabs: React.FC<TabsProps> = React.forwardRef(function Tabs(
  props: TabsProps,
  ref: Ref<any>,
) {
  const styles = useMultiStyleConfig("Tabs", props)
  const { children, className, ...otherProps } = omitThemingProps(props)

  const { htmlProps, ...ctx } = useTabs(otherProps)
  const context = useMemo(() => ctx, [ctx])

  return (
    <TabsProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          className={cx("chakra-tabs", className)}
          ref={ref}
          {...htmlProps}
        >
          {children}
        </chakra.div>
      </StylesProvider>
    </TabsProvider>
  )
})

if (__DEV__) {
  Tabs.displayName = "Tabs"
}

export type TabProps = UseTabProps & PropsOf<typeof chakra.button>

/**
 * Tab button used to activate a specific tab panel. It renders a `button`,
 * and is responsible for automatic and manual selection modes.
 */
export const Tab: React.FC<TabProps> = forwardRef<TabProps>(function Tab(
  props,
  ref,
) {
  const styles = useStyles()
  const tabProps = useTab({ ...props, ref })

  const tabStyles = {
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...styles.tab,
  }

  return (
    <chakra.button
      {...tabProps}
      className={cx("chakra-tabs__tab", props.className)}
      __css={tabStyles}
    />
  )
})

if (__DEV__) {
  Tab.displayName = "Tab"
}

export type TabListProps = Omit<UseTabListProps, "context"> &
  PropsOf<typeof chakra.div>

/**
 * TabList is used to manage a list of tab buttons. It renders a `div` by default,
 * and is responsible the keyboard interaction between tabs.
 */
export const TabList: React.FC<TabListProps> = React.forwardRef(
  function TabList(props: TabListProps, ref: Ref<any>) {
    const tablistProps = useTabList({ ...props, ref })

    const styles = useStyles()
    const tablistStyles = {
      display: "flex",
      ...styles.tablist,
    }

    return (
      <chakra.div
        {...tablistProps}
        className={cx("chakra-tabs__tablist", props.className)}
        __css={tablistStyles}
      />
    )
  },
)

if (__DEV__) {
  TabList.displayName = "TabList"
}

export type TabPanelProps = PropsOf<typeof chakra.div>

/**
 * TabPanel
 * Used to render the content for a specific tab.
 */
export const TabPanel: React.FC<TabPanelProps> = React.forwardRef(
  function TabPanel(props: TabPanelProps, ref: Ref<any>) {
    const panelProps = useTabPanel({ ...props, ref })
    const styles = useStyles()

    return (
      <chakra.div
        {...panelProps}
        className={cx("chakra-tabs__tab-panel", props.className)}
        __css={styles.tabpanel}
      />
    )
  },
)

if (__DEV__) {
  TabPanel.displayName = "TabPanel"
}

export type TabPanelsProps = PropsOf<typeof chakra.div>

/**
 * TabPanel
 *
 * Used to manage the rendering of multiple tab panels. It uses
 * `cloneElement` to hide/show tab panels.
 *
 * It renders a `div` by default.
 */
export const TabPanels: React.FC<TabPanelsProps> = React.forwardRef(
  function TabPanels(props: TabPanelsProps, ref: Ref<any>) {
    const panelsProps = useTabPanels(props)
    return (
      <chakra.div
        {...panelsProps}
        ref={ref}
        className={cx("chakra-tabs__tab-panels", props.className)}
      />
    )
  },
)

if (__DEV__) {
  TabPanels.displayName = "TabPanels"
}

export type TabIndicatorProps = PropsOf<typeof chakra.div>

/**
 * TabIndicator
 *
 * Used to render an active tab indicator that animates between
 * selected tabs.
 */
export const TabIndicator: React.FC<TabIndicatorProps> = React.forwardRef(
  function TabIndicator(props: TabIndicatorProps, ref: Ref<any>) {
    const indicatorStyle = useTabIndicator()
    const style = {
      ...props.style,
      ...indicatorStyle,
    }

    const styles = useStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-tabs__tab-indicator", props.className)}
        style={style}
        __css={styles.indicator}
      />
    )
  },
)

if (__DEV__) {
  TabIndicator.displayName = "TabIndicator"
}
