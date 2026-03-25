//
//  Round_tableApp.swift
//  Round table
//
//  Created by 黄易一 on 2026/3/22.
//

import SwiftUI
import SwiftData
import UniformTypeIdentifiers

@main
struct Round_tableApp: App {
    var body: some Scene {
        DocumentGroup(editing: .itemDocument, migrationPlan: Round_tableMigrationPlan.self) {
            ContentView()
        }
    }
}

extension UTType {
    static var itemDocument: UTType {
        UTType(importedAs: "com.example.item-document")
    }
}

struct Round_tableMigrationPlan: SchemaMigrationPlan {
    static var schemas: [VersionedSchema.Type] = [
        Round_tableVersionedSchema.self,
    ]

    static var stages: [MigrationStage] = [
        // Stages of migration between VersionedSchema, if required.
    ]
}

struct Round_tableVersionedSchema: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)

    static var models: [any PersistentModel.Type] = [
        Item.self,
    ]
}
