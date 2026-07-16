return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('common.appName')}</Text>
        <View style={styles.avatar} />
      </View>

      <MapPlaceholder />

      <FlatList
        horizontal
        data={locations}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.savedRow}
        renderItem={({ item }) => <SavedLocationChip location={item} />}
      />

      <View style={styles.inputCard}>
        <View style={styles.inputRow}>
          <View style={styles.dot} />
          <Text style={styles.inputText}>{t('booking.currentLocation')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            style={styles.textInput}
            placeholder={t('booking.destinationPlaceholder')}
            placeholderTextColor={colors.textMuted}
            value={destination}
            onChangeText={setDestination}
          />
        </View>
      </View>

      <PrimaryButton label={t('booking.confirmMinibus')} onPress={handleConfirm} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  headerTitle: { ...typography.h1, color: colors.white },
  avatar: { width: 36, height: 36, borderRadius: radius.full, backgroundColor: colors.surfaceLight },
  savedRow: { gap: spacing.sm, paddingBottom: spacing.md },
  inputCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  inputText: { color: colors.white, ...typography.body },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  textInput: { flex: 1, color: colors.white, ...typography.body },
});