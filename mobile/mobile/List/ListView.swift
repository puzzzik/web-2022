//
//  ContentView.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import SwiftUI

// MARK: - ListView

struct ListView: View {
    @ObservedObject var viewModel: ListViewModel

    var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.products) { product in
                    NavigationLink {
                        let viewModel = DetailViewModel(product: product)
                        let view = DetailView(viewModel: viewModel)
                        view
                    } label: {
                        cells(product)
                    }
                }
            }
            Button(action: {
                viewModel.obtainProducts()
            }, label: {
                Text("Обновить")
            })
            .navigationTitle("Продукция")
        }
    }
}

func cells(_ product: Product) -> some View {
    @ViewBuilder
    var cellView: some View {
        HStack {
            VStack {
                HStack {
                    Text("\(product.name ?? "Пусто")" )
                        .font(.title2)
                    Text("\(product.brand ?? "Пусто")")
                        .font(.title3)
                    Spacer()
                }
                HStack {
                    Text("тип \(product.type ?? "Пусто"),")
                        .font(.callout)
                    Text("крепость \(product.strength ?? 0)")
                        .font(.callout)
                    Spacer()
                }
            }
            Spacer()
            Text("\(product.price ?? 0) ₽")
                .font(.title3)
        }
        .accentColor(.black)
    }
    return cellView
}
