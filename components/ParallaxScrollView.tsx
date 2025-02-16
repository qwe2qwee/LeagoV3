import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";

const HEADER_HEIGHT = 230;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  refreshing?: boolean; // Optional prop for pull-to-refresh
  onRefresh?: () => void; // Optional handler for pull-to-refresh
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  refreshing = false,
  onRefresh,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
            // Easing.out(Easing.quad) // Smooth easing for translateY
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
            // Easing.out(Easing.quad) // Smooth easing for scale
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom }}
        refreshControl={
          onRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
      >
        {headerImage && (
          <Animated.View
            style={[
              styles.header,
              {
                backgroundColor: headerBackgroundColor[colorScheme],
                paddingTop: 32,
              },
              headerAnimatedStyle,
            ]}
          >
            {headerImage}
          </Animated.View>
        )}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 6,
    paddingBottom: 98,
    backgroundColor: "#f3f4f6",
    gap: 5,
    overflow: "hidden",
  },
});
