//
//  Item.swift
//  Round table
//
//  Created by 黄易一 on 2026/3/22.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date

    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
